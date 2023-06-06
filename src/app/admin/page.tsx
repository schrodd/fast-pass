"use client"
import { headers } from "next/dist/client/components/headers"
import Image from "next/image"

async function getUser(data: any){
  const {username: user, password} = data
  await fetch('https://food-order-app-production-84a2.up.railway.app/login', {
    method: 'POST',
    body: JSON.stringify({
      user,
      password
    })
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export default function Page(){
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
      </div>
    </main>
  )
}