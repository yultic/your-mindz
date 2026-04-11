import { Injectable, Logger } from '@nestjs/common'

interface SingleUseLink {
  bookingUrl: string
  expiresAt: string
}

@Injectable()
export class CalendlyService {
  private readonly logger = new Logger(CalendlyService.name)
  private readonly baseUrl = 'https://api.calendly.com'
  private readonly token = process.env.CALENDLY_TOKEN_SECRET
  private readonly eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI

  async createSingleUseLink(payerName?: string, payerEmail?: string): Promise<string | null> {
    if (!this.token || !this.eventTypeUri) {
      this.logger.error('Calendly credentials are not configured')
      return null
    }

    try {
      const res = await fetch(`${this.baseUrl}/scheduling_links`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          max_event_count: 1,
          owner: this.eventTypeUri,
          owner_type: 'EventType',
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        this.logger.error('Failed to create Calendly single-use link:', error)
        return null
      }

      const data = await res.json()
      let bookingUrl = data.resource.booking_url

      // Prefill name and email if available
      if (payerName || payerEmail) {
        const url = new URL(bookingUrl)
        if (payerName) url.searchParams.set('name', payerName)
        if (payerEmail) url.searchParams.set('email', payerEmail)
        bookingUrl = url.toString()
      }

      return bookingUrl
    } catch (err) {
      this.logger.error('Error creating Calendly scheduling link:', err)
      return null
    }
  }
}