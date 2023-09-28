import { createContext, useReducer, useEffect } from 'react';

// Define role constants
export const ROLE = {
  CUSTOMER: 'CUSTOMER', 
  TEACHER: 'TEACHER' 
};

export const AuthContext = createContext();
  

export const authReducer = (state, action) => {
  console.log('Dispatching action:', action); 
  console.log('Current state:', state);
  
  switch (action.type) {
    case 'LOGIN':
      const newStateLogin = { ...state, user: action.payload };
      console.log('New state after LOGIN:', newStateLogin);
      return { ...state, user: action.payload };
    case 'LOGOUT':
      const newStateLogout = { ...state, user: null, role: null };
      console.log('New state after LOGOUT:', newStateLogout); 
      return { ...state, user: null, role: null };
    case 'SET_ROLE':
      const newStateRole = { ...state, role: action.payload };
      console.log('New state after SET_ROLE:', newStateRole);
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    role: null // Initialize the role here
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      // Convert number role to string role
      dispatch({ type: 'SET_ROLE', payload: user.role === 0 ? ROLE.CUSTOMER : ROLE.TEACHER });
    }
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};