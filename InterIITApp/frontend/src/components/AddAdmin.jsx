import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useSigner } from './Signer'
import { contractABI } from '../utils/ABI';
import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {

    const { signer, address, connectWallet } = useSigner();
    const [adminAddress, setadminAddress] = useState('');
    const [isLoadingAD, setisLoadingAD] = useState(false);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    const navigate = useNavigate()


    const MakeAdmin = async (event) => {
        event.preventDefault()
        setisLoadingAD(true)
        try {
            const contract = new ethers.Contract(contractAddress, contractABI, signer)
            const tx = await contract.addAdmin(adminAddress);
            const receipt = await tx.wait();
            console.log(receipt)
            alert('Admin added');
        } catch (error) {
            console.error("Error in MakeAdmin: ", error);
        } finally {
            setadminAddress('')
            setisLoadingAD(false)
            navigate('/admin',{replace:true})
        }
    }
    return (
        <div className="flex flex-col items-center bg-home-background bg-cover bg-center h-screen">
            <div className='flex flex-col justify-center mx-auto w-full my-auto'>
                <div className='flex flex-col justify-center mx-auto bg-[rgba(180,183,183,0.2)] backdrop-blur-md items-center w-1/2 px-4 rounded-2xl'>
                    <div className='flex items-center flex-col w-full'>
                        <div className='flex justify-center items-center w-full py-3'>
                            <span className='text-2xl font-bold'>Add Admin</span>
                        </div>
                        <form onSubmit={(e) => MakeAdmin(e)} className='flex flex-col items-center w-full'>
                            <div className='flex items-center flex-col w-full py-3'>
                                <input type="text" required placeholder='Address' className='items-center w-full border-4 rounded-xl h-10' onChange={e => setadminAddress(e.target.value)} />
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 px-4 rounded">Add Admin</button>
                        </form>
                        {isLoadingAD && <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            className='my-6'
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAdmin
