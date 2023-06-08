"use client"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { whiteButtonStyle } from "@/app/styles/common";

export default function dashboardLayout({children}: {children: React.ReactNode}){
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {push} = useRouter()
  function deleteAuth(){
    localStorage.removeItem('auth')
    push('/admin/login')
  }
  return (
    <main className="bg-gradient-to-tr from-red-500 to-rose-500 min-h-screen flex flex-col px-5 pb-5">
      {isMenuOpen && (
        <div className={`w-full h-full filter backdrop-blur-md bg-black/50 fixed top-0 left-0 z-10 flex flex-col items-end p-5 gap-3`}>
          <button onClick={() => setIsMenuOpen(e => !e)} className="transition hover:scale-125 animate-pulse"><CloseIcon fontSize="large" sx={{color: 'white'}}/></button>
          <button className={whiteButtonStyle}>Editar menú</button>
          <button className={whiteButtonStyle}>Datos del comercio</button>
          <button onClick={deleteAuth} className={whiteButtonStyle}>Cerrar sesión</button>
        </div>
      )}
      <header className="flex justify-between items-center h-20 drop-shadow">
        <Image src='/fplogo.svg' alt='Fast Pass' width={100} height={50} className="invert"/>
        <button onClick={() => setIsMenuOpen(e => !e)}>
          <MenuIcon fontSize="large" sx={{color: 'white'}}/>
        </button>
      </header>
      {children}
    </main>
  )
}