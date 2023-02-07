import { XMarkIcon } from '@heroicons/react/20/solid'
import cn from 'classnames'
import { Dispatch, SetStateAction, useCallback } from 'react'

import { TagType } from '../pages/index'

type PropsType = {
  tags: TagType[]
  setSelectedTag: Dispatch<SetStateAction<string[]>>
  selectedTags: string[]
  selectable?: boolean
}

export const Tags: React.FC<PropsType> = ({
  tags,
  selectedTags,
  setSelectedTag,
  selectable = true,
}) => {
  const handleClickOnTag = useCallback(
    (tag: string) => {
      if (!selectable) {
        return
      }

      if (selectedTags.includes(tag)) {
        const filtred = selectedTags.filter((t) => t !== tag)
        setSelectedTag(filtred)
      } else {
        setSelectedTag((prev) => [...prev, tag])
      }
    },
    [selectedTags, setSelectedTag, selectable]
  )

  return (
    <div className="flex flex-wrap">
      {tags.map(({ _id, color, name }) => {
        return (
          <div
            key={_id}
            className={cn(
              'mx-1 my-1 flex items-center rounded-full py-1 px-2 text-xs text-white shadow-lg hover:text-gray-100',
              {
                'cursor-pointer': selectable,
              }
            )}
            style={{ backgroundColor: color }}
            onClick={() => handleClickOnTag(name)}
          >
            <div className="select-none">{name}</div>

            {selectable && selectedTags.includes(name) && (
              <XMarkIcon className="ml-2 h-3 w-3 rounded-full bg-gray-50 text-black hover:bg-gray-200" />
            )}
          </div>
        )
      })}
    </div>
  )
}
