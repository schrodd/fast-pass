"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { fetchHelper } from '../../helpers/fetch'
import TableCard from "./components/TableCard";
import AddIcon from '@mui/icons-material/Add';

export default function Page(){
  const {push} = useRouter()
  const [auth, setAuth] = useState('')
  const [tables, setTables] = useState([])
  useEffect(() => {
    const jwt = localStorage.getItem('auth')
    if (jwt) {
      setAuth(jwt)
      fetchHelper('GET', '/tables', undefined, jwt)
      .then((res) => {
        if (!res.ok) {
          throw new Error('HTTP error: ' + res.status)
        }
        return res.json()
      })
      .then((data) => {
        setTables(data)
      })
      .catch(() => {
        localStorage.removeItem('auth')
        push('/admin/login')
      })
    } else {
      push('/admin/login')
    }
  }, [auth])
  return (
    <>
      <div className="w-full mb-5 text-white">
        <p><b>Mesas activas:</b> {tables.length}</p>
      </div>
      <div className="w-full flex flex-row gap-3 flex-wrap justify-start items-center">
        {tables && tables.map((e: any, i: number) => <TableCard data={e} key={i}/>)}
        <div className='bg-slate-100 text-slate-900 p-3 rounded-2xl shadow flex justify-center items-center'><AddIcon/></div>
      </div>
    </>
  )
}