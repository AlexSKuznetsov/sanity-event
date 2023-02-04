import { getYear } from 'date-fns'

export const CurrentYear = () => {
  const currentDate = new Date()
  const currentYear = getYear(currentDate)

  return <div className="text-md mb-2">{currentYear}</div>
}
