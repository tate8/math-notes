import React from 'react'
import './LatexPopup.css'

interface latexPopup {
  onClickValue: React.MouseEventHandler<HTMLButtonElement>
}

function LatexPopup ({ onClickValue }: latexPopup): JSX.Element {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <p className='modal-toggle' onClick={() => setOpen(!open)}>Latex</p>
      {open && (
        <>
        <div className='popup-container'>
          <h3 className='popup-title'>Enter LaTeX</h3>
          <textarea name="latex-textarea" id="latex-textarea" cols={30} rows={10}></textarea>
          <button type="submit" onClick={ (e) => { setOpen(!open); onClickValue(e) }} >Submit</button>
        </div>
        <div className='close-popup-area' onClick={() => setOpen(!open)}></div>
        </>
      )}

    </>
  )
}

export default LatexPopup
