import Modal from '@/app/components/modal'
import { useState } from 'react'

export default function CMS() {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (
    <section className='flex mt-10'>
      <button
        className='ml-auto mr-10 bg-bf-gold p-3 rounded-lg text-black flex flex-row space-x-2 items-center font-bold'
        onClick={handleOpenModal}
      >
        <span>Create Content </span>
        <span className='border-2 border-black rounded-full w-6 h-6 flex items-center justify-center'>+</span>
      </button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h1 className='text-xl pb-10'>Create Content</h1>
        <div className='flex flex-col w-96'>
          <label className='flex flex-col pb-5'>
            Title <input type='text' className='bg-transparent border border-gray-500 rounded p-2' />
          </label>
          <label className='flex flex-col pb-5'>
            Description <textarea className='bg-transparent border border-gray-500 rounded p-2 ' />
          </label>
          <label className='flex flex-col pb-5'>
            Image <textarea className='bg-transparent border border-gray-500 rounded p-2 ' />
          </label>
        </div>
        <button className='w-full bg-bf-gold py-2 rounded-lg text-black font-bold'>Upload</button>
      </Modal>
    </section>
  )
}
