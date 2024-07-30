import Modal from '@/app/components/modal'
import { useState } from 'react'
import AddContentButton from './add-content-button'
import AddContentForm from './add-content-form'

export default function AddContent() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <AddContentButton handleOpenModal={() => setShowModal(true)} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddContentForm handleCloseModal={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
