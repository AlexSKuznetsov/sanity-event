import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import { MONTHS } from '../lib/constants'

type PropsType = {
  selectedMonth: string
  setSelectedMonth: Dispatch<SetStateAction<string>>
}

export const Months: React.FC<PropsType> = ({
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div className="my-4 mx-2 flex flex-wrap justify-start  ">
      {MONTHS.map((month) => (
        <div
          key={month}
          onClick={() => setSelectedMonth(month)}
          className={cn('text-md mx-2 my-1 cursor-pointer', {
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
