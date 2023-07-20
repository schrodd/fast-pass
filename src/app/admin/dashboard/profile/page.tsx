"use client"
import { useCommerces } from '@/app/hooks/useCommerces'
import { FormEvent } from 'react'
import Form from '../components/Form';
import Loading from '../components/Loading';
import getFormData from '@/app/helpers/getFormData';
import { toast } from 'react-toastify'

export default function Page(){
  const { commerce, updateCommerce } = useCommerces()

  async function handleUpdateProfileData(e: FormEvent){
    e.preventDefault()
    if (e.target !== null) {
      const data = getFormData(e)
      await toast.promise(updateCommerce(data, commerce._id), {
        pending: 'Actualizando datos',
        error: 'Error al actualizar',
        success: 'Datos guardados'
      })
    }
  }

  const inputFields = [
    {
      name: "name",
      label: "Nombre comercial",
      type: "text",
      value: commerce.name
    },
    {
      name: "description",
      label: "Descripción",
      type: "text",
      value: commerce.description
    },
    {
      name: "hours",
      label: "Horario",
      type: "text",
      value: commerce.openHours
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "text",
      value: commerce.phoneNumber
    },
    {
      name: "address",
      label: "Dirección",
      type: "text",
      value: commerce.address
    }
  ]

  return Object.keys(commerce).length < 1
  ? <Loading/>
  : <Form fields={inputFields} onSubmit={handleUpdateProfileData} cta='Actualizar información'/>
}