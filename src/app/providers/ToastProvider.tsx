'use client'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider({children}: {children: React.ReactNode}){
  return (
    <>
      {children}
      <ToastContainer
      position="bottom-right"/>
    </>
  )
}