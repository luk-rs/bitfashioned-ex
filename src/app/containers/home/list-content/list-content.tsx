import { getFromIDB, IndexedImage } from '@/app/lib/indexed-db'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function TileComponent({ elem }: { elem: IndexedImage }) {
  return (
    <div className='w-44 h-44 relative m-5 bg-bf-signinbkg flex items-center justify-center'>
      <Image src={elem.ipfsUrl} alt={elem.description} className='rounded-md scale-90' fill priority sizes='auto' />
      <h3 className='absolute w-44 bottom-0 pb-5 left-0 text-center bg-bf-pagebkg opacity-55'>{elem.title}</h3>
    </div>
  )
}
export default function ListContent() {
  const [elems, setElems] = useState<IndexedImage[]>([])

  useEffect(() => {
    const refresh = async () => {
      const indexedElems = await getFromIDB()
      setElems(indexedElems)
    }
    refresh()
  }, [])

  return (
    <div className='flex flex-wrap justify-center pt-10'>
      {elems.map((elem, idx) => (
        <TileComponent key={`elem${idx}`} elem={elem} />
      ))}
    </div>
  )
}
