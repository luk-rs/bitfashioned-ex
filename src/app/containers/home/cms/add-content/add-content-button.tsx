type AddContentButtonProps = {
  handleOpenModal: () => void
}

export default function AddContentButton({ handleOpenModal }: AddContentButtonProps) {
  return (
    <>
      <button
        className='ml-auto mr-10 bg-bf-gold p-3 rounded-lg text-black flex flex-row space-x-2 items-center font-bold'
        onClick={handleOpenModal}
      >
        <span>Create Content </span>
        <span className='border-2 border-black rounded-full w-6 h-6 flex items-center justify-center'>+</span>
      </button>
    </>
  )
}
