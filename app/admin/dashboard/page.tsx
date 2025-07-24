"use client"

import Cookies from "js-cookie"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Dashboard = () => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      Cookies.remove('token')
      router.push("/")
    } catch (err: unknown) {
      console.error('Logout failed: ', err)
    }
  }

  const handleShowToken = () => {
    const storedToken = Cookies.get('token')
    setToken(storedToken || 'No token found')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>

      <div className="space-x-4 mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button
          onClick={handleShowToken}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Show Token
        </button>
      </div>

      {token && (
        <div className="mt-4 bg-white border border-gray-300 rounded p-4 w-full max-w-md">
          <p className="text-gray-700 break-words">
            <strong>Token:</strong> {token}
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
