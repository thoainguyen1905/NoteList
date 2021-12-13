import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_ACCESS } from "./constants";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user:null
  });
  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_ACCESS]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_ACCESS]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_ACCESS);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => loadUser(), []);

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_ACCESS,
          response.data.accessToken
        );
      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.data };
    }
  };
  
  // Register
	const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_ACCESS,
					response.data.accessToken
				)

			await loadUser()

			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
  //Logout
  const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_ACCESS)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}
  const authContextData = { loginUser, authState,registerUser,logoutUser };
  return (
    <>
      <AuthContext.Provider value={authContextData}>
        
        {children}
        
      </AuthContext.Provider>
    </>
  );
};
export default AuthContextProvider;
