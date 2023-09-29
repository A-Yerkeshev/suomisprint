import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    console.log("Logging out");

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}