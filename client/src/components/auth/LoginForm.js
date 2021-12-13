import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link,useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";


const LoginForm = () => {
  const {loginUser}  = useContext(AuthContext)
   
  // const navigate = useNavigate()
    //useState for Login
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const onChangeForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const [alert,setAlert] = useState(null)
  const login = async (e) =>{
    e.preventDefault()
    try {
      const loginData = await loginUser(loginForm)
        if(loginData.success){
          // navigate('/dashboard')
        }else{
          setAlert({type: 'danger',message: loginData.message})
          setTimeout(()=>setAlert(null),3000)
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
      <Form className="my-4" onSubmit = {login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username..."
            name="username"
            required
            onChange={onChangeForm}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password..."
            name="password"
            requiredrequired
            onChange={onChangeForm}
            value={password}
          />
        </Form.Group>
        <Button type="submit" variant="danger">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" className="ml-2" size="sm">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};
export default LoginForm;
