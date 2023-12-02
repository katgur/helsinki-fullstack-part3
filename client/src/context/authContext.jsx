import { createContext, useReducer } from 'react'
import { setToken } from '../service/persons'

const AuthContext = createContext()
const key = 'pb-token'

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, JSON.parse(localStorage.getItem(key)))

    if (user) {
        localStorage.setItem(key, JSON.stringify(user))
        setToken(user.token)
    }

    return (
        <AuthContext.Provider value={{ user, userDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext