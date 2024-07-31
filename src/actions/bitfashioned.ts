'use server'

const api = 'http://65.109.162.147'

function route(path: string) {
  return `${api}/${path}`
}

type GalleryItems = {
  value: string[]
}

type Gallery = {
  key: string
} & GalleryItems

export async function getGallery(signature: string): Promise<string[]> {
  console.log('getting gallery', signature)

  const response = await fetch(route(`get/${signature}`))

  console.log('getting gallery ok', response.ok)
  if (!response.ok) return []
  const gallery: Gallery = await response.json()
  console.log('getting gallery items', gallery)
  return gallery.value
}

export async function updateGallery(signature: string, previousElems: string[], cid: string) {
  const updateBody: GalleryItems = {
    value: previousElems.concat(cid)
  }
  console.log('updateBody', updateBody)

  const response = await fetch(route(`set/${signature}`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateBody)
  })

  if (!response.ok) {
    throw new Error('Could not persist new item')
  }
}
