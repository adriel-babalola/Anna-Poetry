import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET 
const TOKEN_EXPIRY = '7d'

export const generateToken = (adminId) => {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

export const setAuthCookie = async (token) => {
    const cookieStore = await cookies()
    cookieStore.set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    })
}

export const clearAuthCookie = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('adminToken')
}

export const getAuthToken = async () => {
    const cookieStore = await cookies()
    return cookieStore.get('adminToken')?.value
}

export const verifyAdminAuth = async () => {
    const token = await getAuthToken()
    if (!token) return null
    
    const decoded = verifyToken(token)
    return decoded
}
