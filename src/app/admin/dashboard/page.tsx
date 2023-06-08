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
  function getTables(){
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
  }
  function createTable(){
    const jwt = localStorage.getItem('auth')
    if (jwt) {
      // setAuth(jwt)
      fetchHelper('POST', '/tables', undefined, jwt)
      .then((res) => {
        if (!res.ok) {
          throw new Error('HTTP error: ' + res.status)
        }
        return res.json()
      })
      .then(() => {
        getTables()
      })
      .catch(() => {
        localStorage.removeItem('auth')
        push('/admin/login')
      })
    } else {
      push('/admin/login')
    }
  }

  useEffect(() => {
    getTables()
  }, [auth, push])
  
  return (
    <>
      <div className="w-full mb-5 text-white">
        <p><b>Mesas activas:</b> {tables.length}</p>
      </div>
      <div className="w-full flex flex-row gap-3 flex-wrap justify-start items-center">
        {tables && tables.map((e: any, i: number) => <TableCard data={e} key={i}/>)}
        <button onClick={createTable} className='bg-slate-100 text-slate-900 p-3 rounded-2xl shadow flex justify-center items-center'><AddIcon/></button>
      </div>
    </>
  )
}