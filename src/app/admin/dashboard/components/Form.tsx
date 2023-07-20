import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Props { 
  name: string
  label: string
  type: string
  value: string | number | undefined
}

function InputWithLabel({ name, label, type, value }: Props){
  const [fieldValue, setFieldValue] = useState(value)
  return (
    <label className='text-slate-400 mb-2 gap-1 mx-1 flex flex-col md:flex-row md:items-center md:justify-end flex-1 text-sm'>{label}
      <input type={type} name={name} defaultValue={fieldValue} className='input md:mx-3 text-base focus:animate-pulse' onChange={e => setFieldValue(e.target.value)}/>
    </label>
  )
}

export default function Form({fields, onSubmit, cta}: { fields: Props[], onSubmit: (e: FormEvent) => void, cta: string }){
  const nav = useRouter()
  return (
    <div className="bg-white m-5 mt-0 p-5 pt-10 rounded-3xl shadow flex flex-col justify-center items-center gap-y-5 self-center md:items-start md:px-8">
      <form action="" className="flex flex-col flex-wrap gap-2" onSubmit={(e) => onSubmit(e)}>
        {Object.keys(fields).length > 0 && fields.map((e,i) => <InputWithLabel {...e} key={i}/>)}
        <button type="submit" className='button-alt mt-5 place-self-center md:mt-2'>{cta}</button>
        <button onClick={nav.back} className='text-slate-400 text-sm self-center hover:underline'>Volver</button>
      </form>
    </div>
  )
}