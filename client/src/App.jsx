import { useContext, useEffect, useState } from 'react'
import Alert from './component/Alert'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginForm from './component/LoginForm'
import HomePage from './page/HomePage'
import AuthContext from './context/authContext'

const App = () => {
  const [message, setMessage] = useState(null)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [user])

  function showMessage(text, type) {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div className='mx-[auto] p-4 md:w-1/2'>
      <h1 className='text-3xl font-bold text-white'>Phonebook</h1>
      <Alert message={message} />
      <Routes>
        <Route path='/login' element={<LoginForm showMessage={showMessage} />} />
        <Route path='/' element={<HomePage showMessage={showMessage} />} />
      </Routes>
    </div>
  )
}

export default App