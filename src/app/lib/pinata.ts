import axios from 'axios'

export const uploadToPinata = async (file: File) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
      }
    })

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}
