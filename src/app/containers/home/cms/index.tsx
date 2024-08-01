import { getGallery } from '@/actions/bitfashioned'
import { useEffect, useState } from 'react'
import AddContent from './add-content'
import { CMSProvider, useCMS } from './cms-context'
import ListContent from './list-content'

function CMS() {
  const [elems, setElems] = useState<string[]>([])
  const { signature, reRender } = useCMS()

  useEffect(() => {
    if (!signature) return
    ;(async () => {
      const gallery = await getGallery(signature)

      const items = gallery

      setElems(items)
    })()

    return () => {}
  }, [signature, reRender])

  return (
    <section className='flex flex-col mt-10'>
      <AddContent elems={elems} />
      <ListContent elems={elems} />
    </section>
  )
}

export default function WrappedCMS() {
  return (
    <CMSProvider>
      <CMS />
    </CMSProvider>
  )
}
