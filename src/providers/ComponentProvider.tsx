"use client "

import type { PropsWithChildren } from "react"

const ComponentProvider = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <div>
      {children}
    </div>
  )
}

export default ComponentProvider