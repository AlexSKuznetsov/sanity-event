import cn from 'classnames'
import { format, isToday } from 'date-fns'
import { useContext } from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'

type PropsType = {
  onClick: (id: React.ContextType<typeof VisibilityContext>) => void
  selected: boolean
  date: Date
  itemId: string
}

export const Day: React.FC<PropsType> = ({
  onClick,
  selected,
  date,
  itemId,
}) => {
  const visibility = useContext(VisibilityContext)

  const isTonight = isToday(date) as boolean
  const dayOfWeek = format(date, 'eee')
  const dayMonth = format(date, 'd MMM').toUpperCase()

  const renderFormatedDate = () => {
    return (
      <>
        <div className="flex justify-center">{dayOfWeek}</div>
        <div className="flex justify-center">{dayMonth}</div>
      </>
    )
  }

  const renderTonight = () => {
    return (
      <div className="flex h-[48px] items-center justify-center">Tonight</div>
    )
  }

  return (
    <>
      <div
        className={cn(
          'select-noneflex-row mx-2 w-[100px] cursor-pointer items-center justify-center rounded-lg bg-white py-2 px-2 font-bold shadow-lg hover:bg-blue-100 hover:text-gray-800 hover:shadow-xl',
          {
            'border-4 border-red-500 text-red-500 ': selected,
          }
        )}
        onClick={() => onClick(visibility)}
      >
        {isTonight ? renderTonight() : renderFormatedDate()}
      </div>
    </>
  )
}
