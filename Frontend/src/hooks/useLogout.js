import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    console.log("Logging out");

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    
  }

  return { logout }
  navigate('/');
}