"use client"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({children}: {children: React.ReactNode}){
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {push} = useRouter()
  const url = usePathname()

  function getPathname(url: string) {
    switch (url) {
      case '/admin/dashboard':
        return 'Mesas activas'
      case '/admin/dashboard/menu':
        return 'Gestión del Menú'
      case '/admin/dashboard/profile':
        return 'Datos del comercio'
      case '/admin/dashboard/menu/add-product':
        return 'Agregar producto'
      default:
        return ''
    }
  }

  function deleteAuth(){
    localStorage.removeItem('auth')
    push('/admin/login')
  }

  function handleRoute(route: string){
    push(route)
    setIsMenuOpen(e => !e)
  }
  
  return (
    <main className="bg-gradient-to-tr from-slate-900 to-slate-500 min-h-screen flex flex-col px-5 pb-5">
      {isMenuOpen && (
        <div className={`w-full h-full filter backdrop-blur-md bg-black/50 fixed top-0 left-0 z-10 flex flex-col items-end p-5 gap-3`}>
          <button onClick={() => setIsMenuOpen(e => !e)} className="transition hover:scale-125 animate-pulse"><CloseIcon fontSize="large" sx={{color: 'white'}}/></button>
          <button onClick={() => handleRoute('/admin/dashboard')} className="button-white">Ver mesas</button>
          <button onClick={() => handleRoute('/admin/dashboard/menu')} className="button-white">Editar menú</button>
          <button onClick={() => handleRoute('/admin/dashboard/profile')} className="button-white">Datos del comercio</button>
          <button onClick={deleteAuth} className="button-white">Cerrar sesión</button>
        </div>
      )}
      <header className="flex justify-between items-center h-20 drop-shadow">
        <Image src='/fplogo.svg' alt='Fast Pass' width={100} height={50} className="invert cursor-pointer" onClick={() => push('/admin/dashboard')}/>
        <h1 className="md:text-xl md:tracking-wider md:-ml-16 text-white drop-shadow">{getPathname(url)}</h1>
        <button onClick={() => setIsMenuOpen(e => !e)}>
          <MenuIcon fontSize="large" sx={{color: 'white'}}/>
        </button>
      </header>
      {children}
    </main>
  )
}