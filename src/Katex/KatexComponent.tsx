import React from 'react'
import katex from 'katex'

const KatexComponent = ({ texExpression }: { texExpression: string }): JSX.Element => {
  const containerRef = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>

  React.useEffect(() => {
    katex.render(texExpression, containerRef.current, { displayMode: true })
  }, [texExpression])

  return <div ref={containerRef} />
}

export default KatexComponent
