import { getMetadata } from '@/actions/pinata'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type IndexedImage = {
  title: string
  description: string
  ipfsUrl: string
}

function TileComponent({ elem }: { elem: DisplayItem }) {
  return (
    <div className='w-44 h-44 relative m-5 bg-bf-signinbkg flex items-center justify-center'>
      <Image
        src={`https://gateway.pinata.cloud/ipfs/${elem.ipfsHash}`}
        alt={elem.description}
        className='rounded-md scale-90'
        fill
        priority
        sizes='auto'
      />
      <h3 className='absolute w-44 bottom-0 pb-5 left-0 text-center bg-bf-pagebkg opacity-55'>{elem.title}</h3>
    </div>
  )
}

type ListContentProps = {
  elems: string[]
}

type DisplayItem = {
  title: string
  description: string
  ipfsHash: string
}

export default function ListContent({ elems }: ListContentProps) {
  const [items, setItems] = useState<DisplayItem[]>([])

  useEffect(() => {
    ;(async () => {
      const itemHashes = items.map(item => item.ipfsHash)
      const notMapped = elems.filter(elem => !itemHashes.includes(elem))

      for (const item of notMapped) {
        const metadata = await getMetadata(item)

        const withMetadata: DisplayItem = {
          title: metadata.title,
          description: metadata.description,
          ipfsHash: item
        }

        setItems(prv => prv.concat(withMetadata))
      }
    })()

    return () => {}
  }, [elems])

  return (
    <div className='flex flex-wrap justify-center pt-10'>
      {items.map((elem, idx) => (
        <TileComponent key={`elem${idx}`} elem={elem} />
      ))}
    </div>
  )
}
