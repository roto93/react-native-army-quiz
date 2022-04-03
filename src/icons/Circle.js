import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Circle = (props) => (
  <Svg
    width={props.size}
    height={props.size}
    viewBox={'0 0 24 24'}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z"
      fill="currentColor"
    />
  </Svg>
)

export default Circle
