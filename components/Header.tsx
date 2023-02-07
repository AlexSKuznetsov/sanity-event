type PropsType = {
  title: string
}

export const Header: React.FC<PropsType> = ({ title }) => {
  return (
    <>
      {title && (
        <div className="my-4 flex justify-center text-xl font-bold">
          {title}
        </div>
      )}
    </>
  )
}
