import pinataSDK from '@pinata/sdk'
import axios from 'axios'

export const uploadToPinata = async ({ file, title, description }: PinataUpload): Promise<string> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  const formData = new FormData()
  formData.append('file', file)
  const pinataMetadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      title: title,
      description: description
    }
  })
  formData.append('pinataMetadata', pinataMetadata)

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
      }
    })

    return response.data.IpfsHash
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}

export const getPinataMetadata = async (ipfsHash: string) => {
  const url = `https://api.pinata.cloud/data/pinList?cid=${ipfsHash}`

  const response = await axios.get(url, {
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
    }
  })

  const metadata = response.data.rows[0].metadata.keyvalues

  return {
    title: metadata['title'] as string,
    description: metadata['description'] as string
  }
}

type PinataUpload = {
  file: File
  title: string
  description: string
}

const sdk = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY)

async function pinToIPFS({ file, title, description }: PinataUpload): Promise<string> {
  const result = await sdk.pinFileToIPFS(file.stream(), {
    pinataMetadata: {
      name: file.name,
      title: title,
      decription: description
    }
  })

  return result.IpfsHash
}

async function getMetadata(ipfsHash: string) {
  const response = await sdk.pinList({
    hashContains: ipfsHash
  })
  const metadata = response.rows[0].metadata

  return {
    title: metadata['title'] as string,
    description: metadata['description'] as string
  }
}

const pinataLib = {
  pinToIPFS,
  getMetadata
}

export default pinataLib
