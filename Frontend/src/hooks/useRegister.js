// useRegister.js
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const register = async (user) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      console.log(json.error)
      return
    }

    localStorage.setItem('user', JSON.stringify(json))
    dispatch({type: 'LOGIN', payload: json})
    setIsLoading(false)
  }

  return { register, isLoading, error }
}
