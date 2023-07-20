import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Loading(){
  return (
    <div className='flex items-center justify-center text-white animate-pulse'>
      <AutorenewIcon className='animate-spin'/>
      <p className='ml-2 font-light text-sm'>Recuperando información</p>
    </div>
  )
}