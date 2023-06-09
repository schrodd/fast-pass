"use client"
import { useState, useEffect } from 'react'
import { fetchHelper } from '../../helpers/fetch'
import { useRouter } from 'next/navigation';

export default function Page(){
  const {push} = useRouter()
  const [auth, setAuth] = useState('')
  const [commerceData, setCommerceData] = useState({})
  // TODO: Revisar este Fetch
  useEffect(() => {
    const jwt = localStorage.getItem('auth')
    if (jwt) {
      setAuth(jwt)
      fetchHelper('GET', '/commerces', undefined, jwt)
      .then((res) => {
        if (!res.ok) {
          throw new Error('HTTP error: ' + res.status)
        }
        return res.json()
      })
      .then((data) => {
        setCommerceData(data)
      })
    } else {
      push('/admin/login')
    }
  }, [auth])
  return (
    <div>
      
    </div>
  )
}