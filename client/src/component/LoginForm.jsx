import { useContext, useState } from "react"
import authService from "../service/auth"
import AuthContext from "../context/authContext"

function LoginForm({ showMessage }) {
    const [loginData, setLoginData] = useState({ username: "", password: "" })
    const { setUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        authService.login(loginData)
            .then(data => {
                setUser(data)
            })
            .catch(e => {
                showMessage(e.response.data.error, 'error')
            })
    }

    return (
        <form className='mt-2 bg-stone-800 rounded p-4 w-full' onSubmit={handleSubmit}>
            <label className='block'>
                <span className='text-sm text-gray-50 mr-2'>
                    username
                </span>
                <input className='rounded px-2 py-1 bg-stone-300 text-black hover:bg-stone-400 hover:transition-colors focus:bg-stone-400 focus:transition-colors'
                    value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
            </label>
            <label className='block mt-4'>
                <span className='text-sm text-gray-50 mr-2'>
                    password
                </span>
                <input className='rounded px-2 py-1 bg-stone-300 text-black hover:bg-stone-400 hover:transition-colors focus:bg-stone-400 focus:transition-colors'
                    type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            </label>
            <button className='block mt-5 px-4 py-2 bg-blue-600 shadow-md rounded hover:bg-blue-500 hover:transition-colors' type="submit">Login</button>
        </form>
    )
}

export default LoginForm