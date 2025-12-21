'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import typewriterBg from '@/assets/images/typewriter.jpg'

export default function AdminLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            })

            if (response.data.success) {
                toast.success('Login successful!')
                setTimeout(() => {
                    router.push('/admin')
                }, 800)
            } else {
                toast.error(response.data.message || 'Login failed')
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed'
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastContainer theme="dark" position="top-right" />
            <div 
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url(${typewriterBg.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="bg-white py-20 shadow-xl p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Admin Login</h1>
                    <p className="text-center text-gray-600 mb-8">Access your admin dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-500 cursor-pointer text-white font-semibold py-2 transition duration-200"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    
                </div>
            </div>
        </>
    )
}
