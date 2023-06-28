"use client"
import { useCommerces } from '@/app/hooks/useCommerces'
import { FormEvent } from 'react'
import InputWithLabel from './InputWithLabel'

export default function Page(){
  const { commerce, updateCommerce } = useCommerces()

  async function handleUpdateProfileData(e: FormEvent){
    e.preventDefault()
    if (e.target !== null) {
      const formData: any = new FormData(e.target as HTMLFormElement)
      const data: any = {}
      for (let item of formData.entries()) {
        data[item[0]] = item[1]
      }
      const status = await updateCommerce(data, commerce._id)
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
  
  return (
    <div className="bg-white m-5 p-5 rounded-3xl shadow flex flex-col justify-center items-center gap-y-5 self-center md:items-start md:px-8">
      <form action="" className="flex flex-col flex-wrap gap-2" onSubmit={(e: FormEvent) => handleUpdateProfileData(e)}>
        {Object.keys(commerce).length > 0 && inputFields.map((e,i) => <InputWithLabel {...e} key={i}/>)}
        <button id="commerce-update" type="submit" className='button-alt mt-5 place-self-center md:mt-2'>Actualizar información</button>
        <p id='notification' className='w-full text-xs text-slate-400 font-semibold'></p>
      </form>
    </div>
  )
}