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

  async createSingleUseLink(): Promise<SingleUseLink> {
    if (!this.token || !this.eventTypeUri) {
      throw new Error('Calendly credentials are not configured')
    }

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
      throw new Error(`Calendly API error: ${res.status}`)
    }

    const data = await res.json()

    return {
      bookingUrl: data.resource.booking_url,
      expiresAt: data.resource.expiry_time ?? '',
    }
  }
}