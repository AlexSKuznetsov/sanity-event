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

import { getDates } from '../lib/utils'
import { Day } from '.'

type PropsType = {
  selectedMonth: string
  selectedDay: string
  setSelectedDay: Dispatch<SetStateAction<string>>
}

export const DaysScrollMenuItems: React.FC<PropsType> = ({
  selectedMonth,
  selectedDay,
  setSelectedDay,
}) => {
  const isItemSelected = (id: string) => id === selectedDay

  const handleClick = (id: string) => (/* horizontal lib props*/) =>
    setSelectedDay(id)

  const datesArray = useMemo(() => getDates(selectedMonth), [selectedMonth])

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {datesArray.map((day, i) => {
        const dateId = day.toDateString()

        return (
          <Day
            key={i}
            itemId={dateId}
            date={day}
            onClick={handleClick(dateId)}
            selected={isItemSelected(dateId)}
          />
        )
      })}
    </ScrollMenu>
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
