import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'
import { useSigner } from './Signer'
import { contractABI } from '../utils/ABI';
import { Dna} from 'react-loader-spinner'

const AddPatient = () => {
    const { signer, address, connectWallet } = useSigner();
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    const [patAddress, setPatAddress] = useState('');
    const [name, setName] = useState('');
    const [age, setage] = useState('');
    const [gender, setgender] = useState('');
    const [medication, setmedication] = useState('');
    const [medicalCondition, setmedicalCondition] = useState('');
    const [billAmount, setbillAmount] = useState('');
    const [isLoadingPR, setisLoadingPR] = useState(false);
    const navigate = useNavigate()


    const checkPatientExists = async () => {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const record = await contract.viewPatientRecord(patAddress);
        if (record.name !== '') {
            if (window.confirm('Patient already exists. Do you want to edit?')) {
                navigate('/updatePatient');
            }
        }
    }

    useEffect(() => {
        window.ethereum.on('accountsChanged', async function (accounts) {
            await connectWallet();
            navigate('/',{replace:true})
            window.location.reload()
          });
    },[])

    const PatientRecord = async (event) => {
        event.preventDefault()
        setisLoadingPR(true)
        if (patAddress === '') {
            alert('Patient address cannot be empty');
            setisLoadingPR(false);
            return;
        }
        try {
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const billAmountInWholeNumber = parseFloat(billAmount) * Math.pow(10, 18)
            const tx = await contract.addPatientRecord(patAddress, name, age, gender, medicalCondition, medication, billAmountInWholeNumber);
            const receipt = await tx.wait();
            console.log(receipt)
            alert('Patient record added');
        } catch (error) {
            console.error("Error in PatientRecord: ", error);
        }
        finally {
            setPatAddress('')
            setName('')
            setage('')
            setgender('')
            setmedication('')
            setmedicalCondition('')
            setisLoadingPR(false)
            navigate('/admin',{replace:true})
        }
    }
    return (
        <div className="flex justify-center flex-col items-center bg-home-background bg-cover bg-center h-screen">
            <div className='flex flex-col justify-center mx-auto w-full gap-4'>
                <div className='flex flex-col justify-center mx-auto bg-[rgba(180,183,183,0.2)] backdrop-blur-md items-center md:w-1/3 w-2/3 rounded-2xl'>
                    <div className='flex items-center flex-col w-5/6'>
                        <div className='flex justify-center items-center w-full md:py-2 py-1 my-5'>
                            <span className='text-2xl font-bold'>Add Patient</span>
                        </div>
                        <form onSubmit={(e) => PatientRecord(e)} className='flex flex-col items-center w-full'>
                            <div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                                <input type="text" required placeholder='Patient address' className='items-center w-full border-4 rounded-xl h-10' onChange={e => setPatAddress(e.target.value)} />
                            </div>
                            <div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                                <input type="text" required placeholder='Name' className='items-center w-full h-10 border-4 rounded-xl' onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                                <input type="number" min="0" step="1" required placeholder='Age' className='items-center w-full border-4 rounded-xl h-10' onChange={e => setage(e.target.value)} />
                            </div>
                            <div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                                <input type="text" required placeholder='Gender' className='items-center w-full border-4 rounded-xl h-10' onChange={e => setgender(e.target.value)} />
                            </div><div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                                <textarea required placeholder='Medical Condition' className='items-center break-words w-full border-4 rounded-xl h-16' onChange={e => setmedicalCondition(e.target.value)} />
                            </div><div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                                <textarea required placeholder='Medication' className='items-center w-full break-words border-4 rounded-xl h-16' onChange={e => setmedication(e.target.value)} />
                            </div><div className='flex items-center flex-col md:w-3/4 w-full py-3'>
                            <input type="number" step="0.000000000000000001" required placeholder='Bill Amount in ETH' className='items-center w-full border-4 rounded-xl h-10' onChange={e => setbillAmount(e.target.value)} />
                            </div>
                            {!isLoadingPR && <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded my-5">Add Patient Record</button> }
                        </form>
                        {isLoadingPR && <Dna
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

export default AddPatient
