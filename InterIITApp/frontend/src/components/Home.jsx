import React, { useState, useEffect } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { LiaStethoscopeSolid } from 'react-icons/lia'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSigner } from './Signer';
import { contractABI } from '../utils/ABI';
import {ethers} from 'ethers'

const Home = () => {
  const { signer, address, connectWallet } = useSigner()
  const navigate = useNavigate()
  const [role, setRole] = useState(null);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  const handleRoleClick = (newRole) => {
    setRole(newRole);
  }

  const styles = {
    selected: 'flex flex-row justify-center items-center w-full rounded-full bg-blue-500 text-white my-3 p-3 mt-0 cursor-pointer',
    notSelected: 'flex flex-row justify-center items-center w-full rounded-full bg-white my-3 p-3 mt-0 cursor-pointer'
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress,contractABI,signer);

    if(role){
    if (role == 'admin'){
      const admin = await contract.isAdmin(address);
      if(admin){
        navigate(`/${role}`,{replace:true}) 
      }
      else{
        alert('You are not an admin. Go to metamask and use a different account')
        window.location.reload()
      }
    }
    else{
      navigate(`${role}`,{replace:true})
    }
  }
}
useEffect(() => {
  handleRoleClick(role);
}, []);


  return (
    <div className="flex items-center bg-home-background bg-cover bg-center h-screen">
      <div className='flex flex-col justify-center mx-auto bg-[rgba(180,183,183,0.2)] backdrop-blur-md items-center md:w-1/3 w-2/3 rounded-2xl'>
        <div className='flex items-center flex-col w-5/6'>
          <div className='flex flex-row items-center justify-center w-full rounded-full bg-white p-3 my-7 mb-8'>
            <span className='flex justify-center text-xl font-bold'>Your role</span>
          </div>
          <div className={role === 'admin' ? styles.selected : styles.notSelected} onClick={() => handleRoleClick('admin')}>
            <MdAccountCircle fontSize={28} className='mx-3' />
            <span className='flex justify-center'>Admin</span>
          </div>
          <div className={role === 'patient' ? styles.selected : styles.notSelected} onClick={() => handleRoleClick('patient')}>
            <LiaStethoscopeSolid fontSize={28} className='mx-3' />
            <span className='flex justify-center'>Patient</span>
          </div>
          <div className='flex items-center flex-col w-1/2 py-3'>
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home