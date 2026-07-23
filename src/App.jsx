import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Pages Lazy Imports
const HomePage = lazy(() => import('./pages/homePage'))
const LoginPage = lazy(() => import('./pages/loginPage'))
const RegisterPage = lazy(() => import('./pages/registerPage'))
const AdminPage = lazy(() => import('./pages/adminPage'))
const TestPage = lazy(() => import('./pages/test'))
const ForgetPasswordPage = lazy(() => import('./pages/forgetPassword'))
const CheckoutPage = lazy(() => import('./pages/checkout')) // 👈 1. Checkout Page එක Import කළා

function App() {

  return (
    <GoogleOAuthProvider clientId="357070172721-psc9uchu79ptgs1e12d4gbnli96j29mj.apps.googleusercontent.com">
      <div className='w-full h-screen '>
        <Toaster position='top-right'/>
        <Suspense fallback={<div className='w-full h-full flex items-center justify-center'>Loading...</div>}>
          <Routes>

            <Route path='/signin' element={<LoginPage/>}/>

            <Route path='/signup' element={<RegisterPage/>}/>

            <Route path='/forget-password' element={<ForgetPasswordPage/>}/>

            <Route path='/checkout' element={<CheckoutPage/>}/> {/* 👈 2. Checkout Route එක එකතු කළා */}

            <Route path='/admin/*' element={<AdminPage/>}/>

            <Route path='/test' element={<TestPage/>}/>

            {/* /* Route එක හැමතිස්සෙම යටින්ම තියෙන්න ඕන */}
            <Route path='/*' element={<HomePage/>}/>

          </Routes>
        </Suspense>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App