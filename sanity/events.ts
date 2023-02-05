import { CalendarIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Event',
  name: 'event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      title: 'Event Name',
      name: 'eventName',
      type: 'string',
    }),

    defineField({
      title: 'Date',
      name: 'eventDate',
      type: 'date',
    }),

    defineField({
      title: 'Address',
      name: 'adress',
      type: 'string',
      description: 'Event address',
    }),

    defineField({
      title: 'Time period',
      name: 'timePeriod',
      type: 'string',
      description: 'Time period from to',
    }),

    defineField({
      title: 'Price',
      name: 'eventPrice',
      type: 'number',
    }),

    defineField({
      title: 'Image',
      name: 'eventImage',
      type: 'image',
    }),

    defineField({
      title: 'Event link',
      name: 'eventUrl',
      type: 'url',
    }),

    defineField({
      title: 'Tags',
      name: 'eventTags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tags' }],
        },
      ],
    }),
  ],
})
