import { useState } from 'react'

interface Props { 
  name: string
  label: string
  type: string
  value: string | number | undefined
  key: number
}

export default function InputWithLabel({ name, label, type, value }: Props){
  const [fieldValue, setFieldValue] = useState(value)
  return (
    <label className='text-slate-400 mb-2 gap-1 mx-1 flex flex-col md:flex-row md:items-center md:justify-end flex-1 text-sm'>{label}
      <input type={type} name={name} defaultValue={fieldValue} className='input md:mx-3 text-base' onChange={e => setFieldValue(e.target.value)}/>
    </label>
  )
}