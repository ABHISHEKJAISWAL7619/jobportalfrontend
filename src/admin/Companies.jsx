import { Button } from 'antd'
import React from 'react'
import Companiestable from '../admin/Companiestable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {

    let navigate = useNavigate();
  return (
    
    <div>
       <div  className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5' >
            <Button  onClick={()=>navigate("/admin/companies/create")} className='bg-blue-400' >New Company</Button>

        </div>
        <Companiestable/>

       </div>
    </div>
  )
}

export default Companies