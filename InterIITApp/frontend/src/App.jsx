import React from 'react'
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Home, Patient, Admin, AddPatient, AddAdmin } from './components'
import { SignerProvider } from '../src/components/Signer'; // import the SignerProvider

const App = () => {
  return (
    <BrowserRouter>
      <SignerProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='admin' element={<Admin />} />
          <Route path='patient' element={<Patient />} />
          <Route path='addadmin' element={<AddAdmin />} />
          <Route path='addpatient' element={<AddPatient />} />
        </Routes>
      </SignerProvider>
    </BrowserRouter>
  )
}
export default App
