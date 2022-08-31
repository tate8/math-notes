import React from 'react'
import './KatexNoteRow.css'

interface noteRow {
  katexComponent: JSX.Element
}

function KatexNoteRow ({ katexComponent }: noteRow): JSX.Element {
  return (
    <div className='note-row'>
      {katexComponent}
    </div>
  )
}

export default KatexNoteRow
