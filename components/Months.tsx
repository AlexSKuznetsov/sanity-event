import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import { months } from '../lib/constants'

type PropsType = {
  selectedMonth: string
  setSelectedMonth: Dispatch<SetStateAction<string>>
}

export const Months: React.FC<PropsType> = ({
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div className="my-4 flex justify-between">
      {months.map((month) => (
        <div
          key={month}
          onClick={() => setSelectedMonth(month)}
          className={cn('cursor-pointer text-sm', {
            ['border-b-2 border-blue-600 font-semibold text-blue-600']:
              selectedMonth === month,
          })}
        >
          {month}
        </div>
      ))}
    </div>
  )
}
