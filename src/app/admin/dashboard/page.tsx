"use client"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Page(){
  const {push} = useRouter()
  const [auth, setAuth] = useState('')
  useEffect(() => {
    const jwt = localStorage.getItem('auth')
    if (jwt) {
      setAuth(jwt)
    } else {
      push('/admin')
    }
  }, [auth])
  function deleteAuth(){
    localStorage.removeItem('auth')
    push('/admin')
  }
  return (
    <main className="bg-gradient-to-tr from-red-500 to-rose-500 min-h-screen flex place-content-center">
      <div className="bg-white m-5 p-5 w-full rounded-3xl shadow flex flex-col justify-center items-center gap-y-5">
        <Image src='/fplogo.svg' alt='Fast Pass' width={120} height={60} className="opacity-80 mr-3"/>
        <button onClick={deleteAuth}className="bg-gradient-to-tr from-red-500 to-rose-500 border text-slate-100 py-2 px-6 rounded-full font-medium">Logout</button>
      </div>
    </main>
  )
}