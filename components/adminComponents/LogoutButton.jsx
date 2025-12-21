'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout')
            toast.success('Logged out successfully')
            router.push('/admin-login')
        } catch (error) {
            toast.error('Error logging out')
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black"
        >
            Logout
        </button>
    )
}
