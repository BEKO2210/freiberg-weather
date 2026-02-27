import { useState, useRef, useEffect } from 'react'

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

    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
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

      {open && (
        <div className="info-overlay" role="dialog" aria-label={title}>
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
        </div>
      )}
    </>
  )
}
