import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

export default function TableCard({data, actions}: any){
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  function toggleTableMenu(){
    setIsMenuOpen(e => !e)
  }
  function handleActions(action: string, tableNumber: number) {
    switch (action){
      case 'updateSafetyCode':
        actions.updateSafetyCode(tableNumber)
        break
      case 'deleteTable':
        actions.deleteTable(tableNumber)
        break
      // more actions
    }
    toggleTableMenu()
  }
  return (
    <div className={`container w-[48%] md:w-[19%] h-32 bg-slate-100 px-6 py-3 text-slate-800 rounded-2xl
    shadow flex flex-col justify-center items-center relative overflow-hidden`}>
      {isMenuOpen && (
        <div className='w-full h-full absolute bg-slate-100/60 backdrop-blur-sm flex flex-col items-center p-3 gap-1 z-10'>
          <button onClick={() => toggleTableMenu()} className='transition hover:scale-125'><CloseIcon/></button>
          <button className='text-xs hover:underline'>Editar</button>
          <button onClick={() => handleActions('updateSafetyCode', data.tableNumber)} className='text-xs hover:underline'>Cambiar código</button>
          <button onClick={() => handleActions('deleteTable', data.tableNumber)} className='text-xs hover:underline'>Cerrar mesa</button>
        </div>
      )}
      <button onClick={() => toggleTableMenu()} className='absolute top-2 right-2 transition scale-90 hover:scale-100 opacity-50 hover:opacity-100'><SettingsIcon/></button>
      <p className="font-semibold text-center">Mesa #{data.tableNumber}</p>
      <p className='bg-green-500 text-white text-xs px-2 rounded-full my-1'>Disponible</p>
      <p className="">{data.safetyCode}</p>
    </div>
  )
}