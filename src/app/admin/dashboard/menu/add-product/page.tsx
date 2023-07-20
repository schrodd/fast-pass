"use client"
import { FormEvent } from 'react'
import Form from '../../components/Form'
import Loading from '../../components/Loading'
import getFormData from '@/app/helpers/getFormData'
import { useProducts } from '@/app/hooks/useProducts'

export default function Page(){
  const { createProduct } = useProducts()

  async function newProduct(e: FormEvent){
    e.preventDefault()
    if (e.target !== null) {
      const data = getFormData(e)
      const status = await createProduct(data)
      //trigger alert
      const msgTag = document.getElementById('notification')
      if (msgTag) {
        msgTag.innerHTML = status ? 'Datos guardados con éxito' : 'Error al actualizar datos, por favor revise los campos'
        setTimeout(() => {
          msgTag.innerHTML = ''
        }, 3000)
      }
    }
  }

  const inputFields = [
    {
      name: "name",
      label: "Título",
      type: "text",
      value: ''
    },
    {
      name: "description",
      label: "Descripción",
      type: "text",
      value: ''
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      value: ''
    },
    {
      name: "price",
      label: "Precio",
      type: "number",
      value: ''
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      value: ''
    }
  ]

  return false  
  ? <Loading/>
  : <Form fields={inputFields} onSubmit={newProduct} cta='Agregar producto'/>
}