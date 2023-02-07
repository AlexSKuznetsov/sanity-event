import { getYear } from 'date-fns'

export const CurrentYear = () => {
  const currentDate = new Date()
  const currentYear = getYear(currentDate)

  return <div className="mx-5  flex justify-start text-sm ">{currentYear}</div>
}
