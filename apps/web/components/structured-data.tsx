export function StructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization Schema
      {
        '@type': 'ProfessionalService',
        '@id': 'https://therapist-website.com/#organization',
        name: 'Therapy Practice',
        url: 'https://therapist-website.com',
        telephone: '+15551234567',
        email: 'contact@therapypractice.com',
        image: 'https://therapist-website.com/og-image.jpg',
        description: 'Professional mental health therapy and counseling services by a licensed psychotherapist.',
        sameAs: [
          'https://www.facebook.com/therapypractice',
          'https://www.linkedin.com/in/therapist-name',
          'https://twitter.com/therapypractice',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Wellness Street',
          addressLocality: 'Your City',
          addressRegion: 'Your State',
          postalCode: '12345',
          addressCountry: 'US',
        },
        areaServed: ['US'],
      },

      // Person Schema - Therapist
      {
        '@type': 'Person',
        '@id': 'https://therapist-website.com/#therapist',
        name: 'Dr. Sarah Johnson, LCSW',
        url: 'https://therapist-website.com',
        image: 'https://therapist-website.com/therapist-photo.jpg',
        jobTitle: 'Licensed Clinical Social Worker',
        email: 'contact@therapypractice.com',
        telephone: '+15551234567',
        knowsAbout: [
          'Cognitive Behavioral Therapy',
          'Trauma-Focused Therapy',
          'Mindfulness-Based Interventions',
          'Anxiety Disorders',
          'Depression',
          'PTSD',
          'Relationship Issues',
        ],
        qualifications: [
          'Licensed Clinical Social Worker (LCSW)',
          'Master of Arts in Clinical Social Work',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Therapy Practice',
        },
      },

      // LocalBusiness Schema
      {
        '@type': 'LocalBusiness',
        '@id': 'https://therapist-website.com/#local-business',
        name: 'Therapy Practice',
        image: 'https://therapist-website.com/og-image.jpg',
        description: 'Professional therapy and counseling services.',
        url: 'https://therapist-website.com',
        telephone: '+15551234567',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Wellness Street',
          addressLocality: 'Your City',
          addressRegion: 'Your State',
          postalCode: '12345',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.7128',
          longitude: '-74.0060',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '10:00',
            closes: '14:00',
          },
        ],
        sameAs: [
          'https://www.facebook.com/therapypractice',
          'https://www.linkedin.com/in/therapist-name',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.95',
          reviewCount: '180',
        },
      },

      // Service Schema
      {
        '@type': 'Service',
        name: 'Anxiety and Stress Management Therapy',
        description:
          'Evidence-based therapy for anxiety, panic attacks, and chronic stress using CBT and mindfulness approaches.',
        provider: {
          '@type': 'ProfessionalService',
          name: 'Therapy Practice',
        },
        areaServed: 'US',
      },

      // BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://therapist-website.com/#breadcrumbs',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://therapist-website.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: 'https://therapist-website.com/#about',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Services',
            item: 'https://therapist-website.com/#services',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Booking',
            item: 'https://therapist-website.com/#booking',
          },
        ],
      },

      // WebSite Schema with SearchAction
      {
        '@type': 'WebSite',
        '@id': 'https://therapist-website.com/#website',
        url: 'https://therapist-website.com',
        name: 'Therapy Practice',
        description: 'Professional mental health therapy services',
        publisher: {
          '@id': 'https://therapist-website.com/#organization',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
