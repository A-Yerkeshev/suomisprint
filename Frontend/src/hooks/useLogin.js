import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { ROLE } from '../context/AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('user', JSON.stringify(json));

        const role = json.role === 0 ? ROLE.CUSTOMER : ROLE.TEACHER;
        console.log('JSON', json.role)

        dispatch({ type: 'LOGIN', payload: json });
        dispatch({ type: 'SET_ROLE', payload: role });
        return json;
      } else {
        const text = await response.text();
        console.error(`Unexpected response: ${text}`);
        setError(text);  // Or set a generic error message
      }
    } catch (e) {
      setError('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
