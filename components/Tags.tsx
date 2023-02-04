import cn from 'classnames'
import { Dispatch, SetStateAction, useCallback } from 'react'

type PropsType = {
  tags: string[]
  setSelectedTag: Dispatch<SetStateAction<string[]>>
  selectedTags: string[]
}

export const Tags: React.FC<PropsType> = ({
  tags,
  selectedTags,
  setSelectedTag,
}) => {
  const handleClickOnTag = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        const filtred = selectedTags.filter((t) => t !== tag)
        setSelectedTag(filtred)
      } else {
        setSelectedTag((prev) => [...prev, tag])
      }
    },
    [selectedTags, setSelectedTag]
  )

  return (
    <div className="flex">
      {tags.map((tag) => {
        return (
          <div
            key={tag}
            onClick={() => handleClickOnTag(tag)}
            className={cn(
              `mx-1 cursor-pointer rounded-full bg-purple-400 py-1 px-2 text-xs text-white hover:text-gray-300 hover:shadow-lg`,
              {
                'font-semibold text-gray-100 outline outline-1 outline-red-500/60':
                  selectedTags?.includes(tag),
              }
            )}
          >
            {tag}
          </div>
        )
      })}
    </div>
  )
}
