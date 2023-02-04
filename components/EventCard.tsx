import {
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

import { Tags } from './'

type EventInfo = {
  eventName: string
  tags: string[]
  eventTime: string
  eventAddress: string
  eventPrice: number
  eventSlug: string
}

type PropsType = {
  setSelectedTag: Dispatch<SetStateAction<string[]>>
  selectedTags: string[]
  selectedDay: string
  eventInfo: EventInfo
}

export const EventCard: React.FC<PropsType> = ({
  setSelectedTag,
  selectedTags,
  selectedDay,
  eventInfo,
}) => {
  const { eventAddress, eventName, eventPrice, eventSlug, eventTime, tags } =
    eventInfo

  const date = new Date(selectedDay)
  const dayMonth = format(date, 'd MMM').toUpperCase()

  const price = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(eventPrice)
  return (
    <div className="relative mx-2 min-w-[250px] hover:shadow-lg">
      <Image
        src={'/party.jpeg'}
        alt="alt"
        width="250"
        height="150"
        className="rounded-t-lg"
      />
      <div className="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-red-500 py-4 px-2 font-bold text-white">
        {dayMonth}
      </div>
      <div className="rounded-b-lg bg-white">
        <div className="mx-2 mb-2 flex justify-center border-b pt-2 text-xl font-bold">
          {eventName}
        </div>
        <div className="flex justify-start">
          <Tags
            tags={tags}
            selectedTags={selectedTags}
            setSelectedTag={setSelectedTag}
          />
        </div>
        <div className="m-1 flex items-center gap-2">
          <MapPinIcon className="h-4 w-4" />
          <div className="my-1 text-xs font-thin">{eventAddress}</div>
        </div>

        <div className="m-1 flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <div className="my-1 text-sm font-thin">{eventTime}</div>
        </div>

        <div className="mx-2 flex justify-between pt-4">
          <div className="flex items-center gap-2">
            <TicketIcon className="h-4 w-4" />
            <div className="font-bold">{price}</div>
          </div>
          <div>
            <Link href={`/event/${encodeURIComponent(eventSlug)}`}>
              <div className="flex cursor-pointer items-center gap-2 hover:text-blue-500 ">
                <div className="text-sm font-thin">More info</div>
                <ChevronRightIcon className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
