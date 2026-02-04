import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })

export const ConnectDB = async () => {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set')
    }
    await mongoose.connect(uri)
}