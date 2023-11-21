import DecedentForm from '@/Components/DecedentForm'
import DecedentInfo from '@/Components/DecedentInfo'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex'>
      <div className='lg:w-1/3 h-screen overflow-y-auto  ' style={{backgroundColor : '#BEBEBE'}}>
        <DecedentInfo  />
      </div>
      <div className='lg: w-screen h-screen overflow-y-auto' style={{backgroundColor : '#A5A5A8', borderLeft : "2px solid black"}}>
        <DecedentForm/>
      </div>
    </div>
  )
}
