import { useState, useEffect } from 'react'
import { client } from '../sanity/lib/client'
import { groq } from 'next-sanity'
import { getMonth } from 'date-fns'
import { months } from '../lib/constants'
import {
  DaysScrollMenuItems,
  CurrentYear,
  Header,
  Months,
  Tags,
  EventScrollMenu,
} from '../components'
import { GetServerSideProps } from 'next'

type PropsType = {
  title: string
}

export default function IndexPage({ title }: PropsType) {
  const currentDate = new Date()
  const monthIndex = getMonth(currentDate)
  const today = currentDate.toDateString()

  const [selectedMonth, setSelectedMonth] = useState(months[monthIndex])
  const [selectedDay, setSelectedDay] = useState<string>(today)
  const [selectedTags, setSelectedTag] = useState<string[]>([])

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
      <div className="my-4 ml-6">
        <Tags
          tags={['Pop', 'House', 'Latin', 'Hiphhop']}
          setSelectedTag={setSelectedTag}
          selectedTags={selectedTags}
        />
      </div>
      <EventScrollMenu
        setSelectedTag={setSelectedTag}
        selectedTags={selectedTags}
        selectedDay={selectedDay}
      />
    </div>
  )
}

type DataType = {
  title: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageTitleQuery = groq`*[_type == 'pageTitle'][0]`
  const data = await client.fetch<DataType>(pageTitleQuery)

  return {
    props: {
      title: data.title,
    },
  }
}
