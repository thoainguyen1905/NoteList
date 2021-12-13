import { Route, Routes,Navigate } from "react-router-dom"
import LoginForm from "../auth/LoginForm"

function Landing() {
   return(
       <Routes>
           <Route to='/' element={<Navigate replace to='/login'/>}/>
       </Routes>
   )
}

export default Landing