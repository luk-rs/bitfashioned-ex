import React from 'react'

type ModalProps = {
  show: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-bf-modalbkg bg-opacity-55'>
      <div className='bg-bf-modalbkg p-6 rounded shadow-lg relative'>
        <button onClick={onClose} className='absolute top-2 right-2'>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
