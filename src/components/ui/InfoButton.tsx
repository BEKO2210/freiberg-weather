import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface InfoButtonProps {
  title: string
  text: string
}

export function InfoButton({ title, text }: InfoButtonProps) {
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <>
      <button
        className="info-btn"
        onClick={(e) => { e.stopPropagation(); setOpen(true) }}
        aria-label={`Info: ${title}`}
        title={`Info: ${title}`}
      >
        i
      </button>

      {open && createPortal(
        <div className="info-overlay" role="dialog" aria-modal="true" aria-label={title}>
          <div className="info-modal" ref={modalRef}>
            <div className="info-modal-header">
              <h3>{title}</h3>
              <button
                className="info-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Schließen"
              >
                &times;
              </button>
            </div>
            <p className="info-modal-text">{text}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
