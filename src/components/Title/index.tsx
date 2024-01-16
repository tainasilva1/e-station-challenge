import { memo } from "react"

type Props = {
  children: string;
}

const Title = ({ children }: Props) => (
  <h3 className="text-lg text-gray-700 font-sans font-semibold">
    {children}
  </h3>
)

export default memo(Title)