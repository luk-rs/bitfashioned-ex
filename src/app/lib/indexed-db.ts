import { openDB } from 'idb'

const DB_NAME = 'myDatabase'
const STORE_NAME = 'uploads'

const init = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
  return db
}
export type IndexedImage = {
  title: string
  description: string
  ipfsUrl: string
}

export const saveToIDB = async (data: IndexedImage) => {
  const db = await init()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.add(data)
  await tx.done
}

export const getFromIDB = async () => {
  const db = await init()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const allRecords = (await store.getAll()).map(x => x as IndexedImage)
  await tx.done
  return allRecords
}
