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
    <label className='text-slate-400 mb-1 ml-2 flex flex-col flex-1'>{label}
      <input type={type} name={name} defaultValue={fieldValue} className='input mb-3' onChange={e => setFieldValue(e.target.value)}/>
    </label>
  )
}