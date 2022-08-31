import React from 'react'
import './EditableNoteRow.css'

interface initRow {
  id: number
  type: string
}

interface noteRowData {
  initRowData: initRow
}

function EditableNoteRow ({ initRowData }: noteRowData): JSX.Element {
  const [rowData] = React.useState<initRow>(initRowData)
  const rowContent = React.useRef<HTMLElement>(null)

  const CustomTag = `${initRowData.type}` as keyof JSX.IntrinsicElements
  const CustomElement = React.createElement(
    CustomTag,
    {
      contentEditable: 'true',
      spellCheck: 'false',
      suppressContentEditableWarning: true,
      ref: rowContent
    },
    rowContent.current?.textContent
  )

  return (
    <div className='note-row'>
      <p>{rowData.id}</p>
      {CustomElement}
    </div>
  )
}

export default EditableNoteRow
