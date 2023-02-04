import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useMemo,
} from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import { EventCard } from './'

type PropsType = {
  setSelectedTag: Dispatch<SetStateAction<string[]>>
  selectedTags: string[]
  selectedDay: string
}

const event = {
  eventName: 'PartyName - Venue',
  tags: ['House', 'Techno'],
  eventAddress: 'Leidsekade 22, 1171MG Amsterdam',
  eventTime: '23:00 - 05:00',
  eventPrice: 25,
  eventSlug: 'some-link',
}

export const EventScrollMenu: React.FC<PropsType> = ({
  selectedTags,
  setSelectedTag,
  selectedDay,
}) => {
  return (
    <div className="my-2">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        <EventCard
          selectedTags={selectedTags}
          setSelectedTag={setSelectedTag}
          selectedDay={selectedDay}
          eventInfo={event}
        />
        <EventCard
          selectedTags={selectedTags}
          setSelectedTag={setSelectedTag}
          selectedDay={selectedDay}
          eventInfo={event}
        />
        <EventCard
          selectedTags={selectedTags}
          setSelectedTag={setSelectedTag}
          selectedDay={selectedDay}
          eventInfo={event}
        />
        <EventCard
          selectedTags={selectedTags}
          setSelectedTag={setSelectedTag}
          selectedDay={selectedDay}
          eventInfo={event}
        />
        <EventCard
          selectedTags={selectedTags}
          setSelectedTag={setSelectedTag}
          selectedDay={selectedDay}
          eventInfo={event}
        />
        <EventCard
          selectedTags={selectedTags}
          setSelectedTag={setSelectedTag}
          selectedDay={selectedDay}
          eventInfo={event}
        />
      </ScrollMenu>
    </div>
  )
}

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext)

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <ChevronLeftIcon className="h-12 w-10" />
    </Arrow>
  )
}
const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext)

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <ChevronRightIcon className="h-12 w-10" />
    </Arrow>
  )
}

const Arrow = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  disabled: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex cursor-pointer select-none items-center justify-center',
        {
          ['opacity-0']: disabled,
          ['opacity-1']: !disabled,
        }
      )}
    >
      {children}
    </button>
  )
}
