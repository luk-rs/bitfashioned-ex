import AddContent from '@/app/containers/home/add-content'
import ListContent from './list-content/list-content'

export default function CMS() {
  return (
    <section className='flex flex-col mt-10'>
      <AddContent />
      <ListContent />
    </section>
  )
}
