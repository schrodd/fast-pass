import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { whiteButtonStyle } from '@/app/styles/common';

export default function TableCard({data}: any){
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const active = true
  return (
    <div className={`container w-[48%] md:w-[19%] h-32 bg-slate-100 px-6 py-3 text-slate-800 rounded-2xl
    shadow flex flex-col justify-center items-center relative overflow-hidden`}>
      {isMenuOpen && (
        <div className='w-full h-full absolute bg-slate-100/40 backdrop-blur-sm flex flex-col items-center p-3 gap-1 z-10'>
          <button onClick={() => setIsMenuOpen(e => !e)} className='transition hover:scale-125'><CloseIcon/></button>
          <button className='text-xs hover:underline'>Editar</button>
          <button className='text-xs hover:underline'>Cambiar código</button>
          <button className='text-xs hover:underline'>Cerrar</button>
        </div>
      )}
      <button onClick={() => setIsMenuOpen(e => !e)} className='absolute top-2 right-2 transition scale-90 hover:scale-100 opacity-50 hover:opacity-100'><SettingsIcon/></button>
      <p className="font-semibold text-center">Mesa #{data.tableNumber}</p>
      <p className='bg-green-500 text-white text-xs px-2 rounded-full my-1'>Disponible</p>
      <p className="">{data.safetyCode}</p>
    </div>
  )
}