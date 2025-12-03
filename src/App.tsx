import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ExamPage from './pages/ExamPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/exam' element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
