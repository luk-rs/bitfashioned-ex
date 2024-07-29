import AddContentButton from '@/app/containers/home/add-content/add-content-button'
import ListContent from './list-content/list-content'

export default function CMS() {
  return (
    <section className='flex flex-col mt-10'>
      <AddContentButton />
      <ListContent />
    </section>
  )
}
