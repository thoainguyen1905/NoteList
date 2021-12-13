import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";

function Auth({ authRoute }) {
//   const navigate = useNavigate();
//   const redirect = <Navigate to='/dashboard'/>
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);
  let body;
  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner variant="info" animation="border" />
      </div>
    );
  else if (isAuthenticated) return <Navigate to='/dashboard'/>
  else if(!isAuthenticated) return <Navigate to='/login'/>
  else
    body = (
      <div>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </div>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn It</h1>
          <h4>keep your flame always</h4>
          {body}
        </div>
      </div>
    </div>
  );
}
export default Auth;
