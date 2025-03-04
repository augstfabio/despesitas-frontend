
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { AuthProvider } from './Context/AuthContext'
import PrivateLoginAndRegister from './components/PrivateLoginAndRegister'
import EditPage from './pages/EditPage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/despesa/editar' element={<EditPage/>} />
            <Route path='/login' element={<PrivateLoginAndRegister><Login /></PrivateLoginAndRegister>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
