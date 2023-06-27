"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { fetchHelper } from '@/app/helpers/fetch'

export default function Page(){
  const { push } = useRouter()

  async function getUser(data: any){
    const {username, password} = data
    await fetchHelper('POST', '/login', '', {username, password})
    .then((res) => {
      if (!res.ok) throw new Error('HTTP error: ' + res.status)
      return res.json()
    })
    .then((data) => {
      if (data) localStorage.setItem("auth", data.access_token)
    }).catch((err) => {
      console.log(err)
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget) as Iterable<[PropertyKey, string]>)
    await getUser(data)
    push('/admin/dashboard')
  }

  useEffect(() => {
    const token = localStorage.getItem("auth")
    if (token) push('/admin/dashboard')
  })

  return (
    <main className="bg-gradient-to-tr from-red-500 to-rose-500 h-screen flex place-content-center">
      <div className="bg-white m-5 p-5 w-full rounded-3xl shadow flex flex-col justify-center items-center gap-y-5">
        <Image src='/fplogo.svg' alt='Fast Pass' width={120} height={60} className="opacity-80 mr-3"/>
        <form action="" className="flex flex-col place-items-center gap-y-3" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <input type="text" name="username" placeholder="Usuario" className='input'/>
          <input type="password" name="password" placeholder="Contraseña" className='input'/>
          <button id="admin-login" type="submit" className='button-main'>Iniciar sesión</button>
        </form>
      </div>
    </main>
  )
}