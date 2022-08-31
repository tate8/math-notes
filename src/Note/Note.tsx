import React from 'react'
import KatexComponent from '../Katex/KatexComponent'
import EditableNoteRow from './EditableNoteRow'
import KatexNoteRow from './KatexNoteRow'
import LatexPopup from './LatexPopup'
import './Note.css'

// TODO: GET CONTENT FROM DATABASE?
// this component manages the id and type of the rows
// the rows manage their individual content
interface noteRow {
  id: number
  type: string
}

interface rowTypeOption {
  'Large heading': string
  'Small heading': string
  Paragraph: string
  'Inline Desmos graph': string
  Latex: string
}

const newRowTypeOptions: rowTypeOption = {
  'Large heading': 'h1',
  'Small heading': 'h3',
  Paragraph: 'p',
  'Inline Desmos graph': 'input',
  Latex: 'Latex'
}

interface DnDState {
  draggedFrom: number | null
  draggedTo: number | null
  isDragging: boolean
  originalOrder: [] | noteRow[]
  updatedOrder: [] | noteRow[]
}

const initialDnDState: DnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}

function Note (): JSX.Element {
  const [noteRows, setNoteRows] = React.useState(Array<noteRow>)
  const [idIndex, setIdIndex] = React.useState(0)
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState)

  /*************************************
   * Drag and Drop functionality
  *************************************/
  // onDragStart fires when an element starts being dragged
  const onDragStart: React.DragEventHandler<HTMLLIElement> = (event): void => {
    const initialPosition = Number(event.currentTarget.dataset.position)

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: noteRows
    })

    // firefox
    event.dataTransfer.setData('text/html', '')
  }

  // onDragOver fires when an element being dragged enters a droppable area.
  const onDragOver: React.DragEventHandler<HTMLLIElement> = (event): void => {
    event.preventDefault()

    let newList = dragAndDrop.originalOrder

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position)

    if (draggedFrom != null) {
      const itemDragged = newList[draggedFrom]
      const remainingItems = newList.filter((item, index) => index !== draggedFrom)

      newList = [
        ...remainingItems.slice(0, draggedTo),
        itemDragged,
        ...remainingItems.slice(draggedTo)
      ]

      if (draggedTo !== dragAndDrop.draggedTo) {
        setDragAndDrop({
          ...dragAndDrop,
          updatedOrder: newList,
          // eslint-disable-next-line object-shorthand
          draggedTo: draggedTo
        })
      }
    } else {
      console.log('dragged from null')
    }
  }

  const onDrop: React.DragEventHandler<HTMLLIElement> = (event): void => {
    setNoteRows(dragAndDrop.updatedOrder)

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    })
  }

  const onDragLeave = (): void => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    })
  }

  const handleNewNoteRowIcon: React.MouseEventHandler<HTMLElement> = (e: React.MouseEvent<HTMLElement>): void => {
    const selectedItem = e.currentTarget.textContent
    if (selectedItem != null) {
      // get the requested type to insert
      const newRowType = newRowTypeOptions[selectedItem as keyof rowTypeOption]

      const newRow = {
        id: idIndex,
        type: newRowType
      }
      setIdIndex(idIndex + 1)

      // now close details element
      const addRowIcon = document.querySelector('.add-new-note-row-icon')
      addRowIcon?.removeAttribute('open')

      setNoteRows(prev => [...prev, newRow])
    }
  }

  const handleAddLatex: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    const popupContainer = e.currentTarget.parentNode
    const textarea = popupContainer?.querySelector('textarea')
    if (textarea?.value != null) {
      const latexContent = textarea.value
      const newRowType = newRowTypeOptions.Latex
      const newRow = {
        id: idIndex,
        type: newRowType,
        content: latexContent
      }
      setIdIndex(idIndex + 1)

      // now close details element
      const addRowIcon = document.querySelector('.add-new-note-row-icon')
      addRowIcon?.removeAttribute('open')

      // clear latex input
      const latexInput: HTMLTextAreaElement | null = document.querySelector('#tex-input')
      if (latexInput != null) {
        latexInput.value = ''
      }

      setNoteRows(prev => [...prev, newRow])
    }
  }

  // const noteRowKeyup: React.KeyboardEventHandler = (e: React.KeyboardEvent): void => {
  //   const key = e.key
  //   const currentEditingElement = e.currentTarget
  //   const currentEditingElementText = e.currentTarget.textContent
  //   if (key === 'Backspace' && currentEditingElementText === '') {
  //     const parentNode = currentEditingElement.parentNode?.parentNode?.parentNode
  //     const listItem = currentEditingElement.parentNode?.parentNode
  //     if (listItem != null) {
  //       parentNode?.removeChild(listItem)
  //     }
  //   }
  // }

  // const updateChildData = (newRowData: noteRow): void => {
  //   // if ID already present, just update it
  //   const index = noteRows.findIndex(x => x.id === newRowData.id)
  //   if (index != null) {
  //     // make shallow copy of note rows
  //     const rows = [...noteRows]
  //     // update row and replace
  //     const newRow = {
  //       ...rows[index],
  //       content: newRowData.content
  //     }
  //     rows[index] = newRow
  //     setNoteRows(rows)
  //   } else {
  //     setNoteRows(prev => [...prev, newRowData])
  //   }
  // }

  return (
    <div className="note-container">
        <input type="text" className='note-title' placeholder='New note'></input>
        <hr />
        <ul id="note-list" className='fa-ul'>
        {
          Object.keys(noteRows).map((row, id) => {
            const rowData = noteRows[id]
            if (rowData != null) {
              const rowType = rowData.type
              // const rowContent = rowData.content
              const rowContent = 'x+y'
              if (rowType === 'Latex') {
                const katexComponent = <KatexComponent texExpression={rowContent} />
                return <li draggable
                          key={id}
                          onDragStart={onDragStart}
                          onDragOver={onDragOver}
                          onDrop={onDrop}
                          onDragLeave={onDragLeave}
                          className={((dragAndDrop != null) && dragAndDrop.draggedTo === Number(id)) ? 'drop-area' : ''}
                          data-position={id} >
                        <i className="fa-li fa-solid fa-grip-vertical"></i>
                        <KatexNoteRow katexComponent={katexComponent} />
                      </li>
              } else {
                return <li draggable
                          key={id}
                          onDragStart={onDragStart}
                          onDragOver={onDragOver}
                          onDrop={onDrop}
                          onDragLeave={onDragLeave}
                          className={((dragAndDrop != null) && dragAndDrop.draggedTo === Number(id)) ? 'drop-area' : ''}
                          data-position={id} >
                        <i className="fa-li fa fa-grip-vertical"></i>
                        <EditableNoteRow initRowData={rowData} />
                      </li>
              }
            } else {
              return <></>
            }
          })
        }
        </ul>
        <details className='add-new-note-row-icon'>
          <summary><i className="fa-solid fa-plus"></i></summary>
          <ul className='row-type-options'>
            {
              Object.keys(newRowTypeOptions).map((name, id) => {
                if (name === 'Latex') {
                  return <li className='row-type-option row-type-option-latex' key={id}>
                    <LatexPopup onClickValue={handleAddLatex} />
                  </li>
                } else {
                  return <li className='row-type-option' key={id} onClick={handleNewNoteRowIcon}>{name}</li>
                }
              })
            }
          </ul>
        </details>
    </div>
  )
}

export default Note
