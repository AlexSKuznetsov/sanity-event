import { format, getMonth } from 'date-fns'
import { GetServerSideProps } from 'next'
import { groq } from 'next-sanity'
import { useCallback, useEffect, useState } from 'react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import {
  CurrentYear,
  DaysScrollMenuItems,
  EventScrollMenu,
  Header,
  Months,
  Tags,
} from '../components'
import { MONTHS } from '../lib/constants'
import { client } from '../sanity/lib/client'

type PropsType = {
  title: string
  tags: TagType[]
}

export default function IndexPage({ title, tags }: PropsType) {
  const currentDate = new Date()
  const monthIndex = getMonth(currentDate)
  const today = currentDate.toDateString()

  const [selectedMonth, setSelectedMonth] = useState(MONTHS[monthIndex])
  const [selectedDay, setSelectedDay] = useState<string>(today)
  const [selectedTags, setSelectedTag] = useState<string[]>([])
  const [eventsState, setEventsState] = useState<EventInfo[]>([])

  const fetchEvent = useCallback(async () => {
    const selectedDate = format(new Date(selectedDay), 'yyyy-MM-dd')
    const match =
      selectedTags.length === 0
        ? "'*'"
        : selectedTags.map((el) => `"${el}"`).join(', ')

    const eventsQuery = groq`*[_type == 'event' && eventDate == '${selectedDate}' && eventTags[]->genre match [${match}]]
      {_id, eventName, eventPrice, eventUrl, 'eventTime': timePeriod, 'eventAddress': adress, 
      eventImage {asset -> {..., metaData}},
      'tags': eventTags[]->{'name': genre, 'color': color.hex, _id}}`

    const events = await client.fetch<EventInfo[]>(eventsQuery)

    setEventsState(events)
  }, [selectedDay, selectedTags])

  useEffect(() => {
    if (selectedDay && selectedTags) {
      fetchEvent()
    }
  }, [selectedTags, selectedDay, fetchEvent])

  return (
    <div className="m-auto max-w-[70%]">
      <Header title={title} />
      <CurrentYear />
      <Months
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <DaysScrollMenuItems
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="my-4 ml-6 flex max-w-md">
        <Tags
          tags={tags}
          setSelectedTag={setSelectedTag}
          selectedTags={selectedTags}
        />
      </div>
      <EventScrollMenu
        setSelectedTag={setSelectedTag}
        selectedTags={selectedTags}
        selectedDay={selectedDay}
        events={eventsState}
      />
    </div>
  )
}

type PageType = {
  title: string
}

export type TagType = {
  _id: string
  name: string
  color: string
}

export type EventInfo = {
  _id: string
  eventImage: { asset: SanityImageSource }
  eventDate: Date
  eventName: string
  tags: TagType[]
  eventTime: string
  eventAddress: string
  eventPrice: number
  eventUrl: string
}

// initial loading datas like page header, all existing tags and all events
export const getServerSideProps: GetServerSideProps = async () => {
  const pageTitleQuery = groq`*[_type == 'pageTitle'][0]`
  const tagsQuery = groq`*[_type == 'tags']{'name': genre, _id, 'color': color.hex}`

  const page = await client.fetch<PageType>(pageTitleQuery)
  const tags = await client.fetch<TagType[]>(tagsQuery)

  return {
    props: {
      title: page.title,
      tags,
    },
  }
}
