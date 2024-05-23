import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractABI } from '../utils/ABI';
import { useSigner } from './Signer'
import { Dna } from 'react-loader-spinner';
import { AiFillCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
const Patient = () => {

  const { signer, address, connectWallet } = useSigner();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [clicked, setClicked] = useState(false); // New state variable
  const [hasPaid, setHasPaid] = useState(false);
  const [billAmount, setBillAmount] = useState(0);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const paid = await contract.hasPaidBill(address);
      const amount = await contract.getBillAmount(address);
      setHasPaid(paid);
      setBillAmount((ethers.formatEther(amount)));
      console.log(billAmount) // Convert Wei to Ether
    }
    checkPaymentStatus();
  }, [address, signer]);

  const viewRecord = async (event) => {
    event.preventDefault()
    setisLoading(true)
    setClicked(false) // Set clicked to true when the button is clicked
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const report = await contract.viewPatientRecord(address)
      console.log(report)
      const extractedReport = {
        name: report[0],
        age: report[1].toString(),
        gender: report[2],
        medicalCondition: report[3],
        medication: report[4]
      }
      setReport(extractedReport)

    } catch (error) {
      console.error("Error in PatientRecord: ", error);
    }
    setisLoading(false)
    setClicked(true)
  }

  const payBill = async () => {
    setisLoading(true)
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.makePayment({ value: ethers.parseEther(billAmount) });
    const receipt = await tx.wait()
    console.log(receipt) // Pay the bill amount
    setHasPaid(true);
    setisLoading(false)
  }

  return (
    <div className="flex flex-col items-center bg-home-background bg-cover bg-center h-screen">
      <div className='flex flex-col mt-7 justify-center mx-auto bg-[rgba(180,183,183,0.2)] backdrop-blur-md items-center md:w-1/3 w-2/3 rounded-2xl'>
        <div className='flex gap-3 items-center flex-col w-5/6'>
          <div className='flex justify-center items-center w-full md:py-2 py-1 my-7'>
            <span className='flex justify-center text-xl font-bold'>Your report</span>
          </div>
          {clicked && (report ? (
            <div style={{ padding: '10px' }}>
              <label htmlFor="1">Name :</label>
              <input type="text" id='1' value={report.name} className='items-center w-full border-4 rounded-xl h-10' readOnly />
              <label htmlFor="2">Age :</label>
              <input type="text" id='2' value={report.age} className='items-center w-full border-4 rounded-xl h-10' readOnly />
              <label htmlFor="3">Gender :</label>
              <input type="text" id='3' value={report.gender} className='items-center w-full border-4 rounded-xl h-10' readOnly />
              <label htmlFor="4">Medical Condition :</label>
              <input type="text" id='4' value={report.medicalCondition} className='items-center w-full border-4 rounded-xl h-10' readOnly />
              <label htmlFor="5">Medication :</label>
              <input type="text" id='5' value={report.medication} className='items-center w-full border-4 rounded-xl h-10' readOnly />
            </div>
          ) : (
            <div>No Record</div>
          ))}
          <div className='flex items-center flex-col w-1/2 py-3'>
            <button onClick={viewRecord} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check</button>
            {clicked && !hasPaid && <button onClick={payBill} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Pay Bill ({billAmount} Ether)</button>}
            {clicked && hasPaid && <div className="flex flex-row items-center gap-3 bg-green-500 text-white font-bold py-2 px-4 rounded mt-4" ><AiFillCheckCircle fontSize={28} /><span>Already paid</span></div>}
          </div>
          {isLoading && <Dna
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
      {!isLoading && <button onClick={() => navigate('/', { replace: true })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded">Home</button>}
    </div>
  )
}

export default Patient
