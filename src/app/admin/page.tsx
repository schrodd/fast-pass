"use client"
import { headers } from "next/dist/client/components/headers"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { set } from '../../redux/sessionSlice'

export default function Page(){
  const dispatch = useAppDispatch()
  const authKey = useAppSelector((state) => state.sessionSlice.authKey)
  async function getUser(data: any){
    const {username, password} = data
    console.log({username, password})
    await fetch('http://localhost:3000/login', {
      headers: new Headers({'content-type': 'application/json'}),
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    })
    .then((res) => res.json())
    .then((data) => {
      dispatch(set(data.access_token))
      console.log('auth token saved')
    })
    .catch((err) => {
      console.log(err)
    })
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget) as Iterable<[PropertyKey, string]>)
    await getUser(data)
  }
  const inputTw = 'border border-slate-200 bg-slate-100 py-2 px-5 rounded-full'
  return (
    <main className="bg-gradient-to-tr from-red-500 to-rose-500 h-screen flex place-content-center">
      <div className="bg-white m-5 p-5 w-full rounded-3xl shadow flex flex-col justify-center items-center gap-y-5">
        <Image src='/fplogo.svg' alt='Fast Pass' width={120} height={60} className="opacity-80 mr-3"/>
        <form action="" className="flex flex-col place-items-center gap-y-3" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <input type="text" name="username" placeholder="Usuario" className={inputTw}/>
          <input type="password" name="password" placeholder="Contraseña" className={inputTw}/>
          <button id="admin-login" type="submit" className="bg-gradient-to-tr from-red-500 to-rose-500 border text-slate-100 py-2 px-6 rounded-full font-medium">Iniciar sesión</button>
        </form>
        <div className="w-1/2">
          <p className="break-all text-xs">Active token: {authKey}</p>
        </div>
      </div>
    </main>
  )
}