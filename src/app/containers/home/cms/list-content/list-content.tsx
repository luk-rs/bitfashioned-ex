import Image from 'next/image'

export type IndexedImage = {
  title: string
  description: string
  ipfsUrl: string
}

function TileComponent({ elem }: { elem: IndexedImage }) {
  return (
    <div className='w-44 h-44 relative m-5 bg-bf-signinbkg flex items-center justify-center'>
      <Image src={elem.ipfsUrl} alt={elem.description} className='rounded-md scale-90' fill priority sizes='auto' />
      <h3 className='absolute w-44 bottom-0 pb-5 left-0 text-center bg-bf-pagebkg opacity-55'>{elem.title}</h3>
    </div>
  )
}

type ListContentProps = {
  elems: string[]
}

export default function ListContent({ elems }: ListContentProps) {
  return (
    <div className='flex flex-wrap justify-center pt-10'>
      {elems
        .map(cid => ({
          title: 'random',
          description: 'randomDesc',
          ipfsUrl: `https://gateway.pinata.cloud/ipfs/${cid}`
        }))
        .map((elem, idx) => (
          <TileComponent key={`elem${idx}`} elem={elem} />
        ))}
    </div>
  )
}
