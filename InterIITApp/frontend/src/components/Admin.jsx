import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate = useNavigate()

  return (
    <div className="flex items-center bg-home-background bg-cover bg-center h-screen">
      <div className='flex flex-col justify-center mx-auto bg-[rgba(180,183,183,0.2)] backdrop-blur-md items-center md:w-1/3 w-2/3 pb-5'>
        <div className='flex justify-center'><span className='text-2xl font-bold my-0 p-4 mb-6'>What do you want to do ?</span></div>
        <div className='flex justify-center my-4' onClick={() => navigate('/addpatient')}><span className='text-2xl font-bold my-0 hover cursor-pointer p-4 rounded-2xl'>Add Patient</span></div>
        <div className='flex justify-center my-4' onClick={() => navigate('/addadmin')}><span className='text-2xl font-bold my-0 hover cursor-pointer p-4 rounded-2xl'>Add Admin</span></div>
      </div>
    </div>
  )
}

export default Admin
