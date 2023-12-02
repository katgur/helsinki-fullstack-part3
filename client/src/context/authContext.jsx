import { createContext, useEffect, useState } from 'react'
import { setToken } from '../service/persons'

const AuthContext = createContext()
const key = 'pb-token'

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(key)))

    if (user) {
        localStorage.setItem(key, JSON.stringify(user))
        setToken(user.token)
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext