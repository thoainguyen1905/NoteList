import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState,useContext } from "react";
import AlertMessage from "../layout/AlertMessage";
import {AuthContext} from '../../contexts/AuthContext'

function Register () {
    // Context
	const { registerUser } = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: ''
	})

	const [alert, setAlert] = useState(null)

	const { username, password, confirmPassword } = registerForm

	const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})

	const register = async event => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Passwords do not match' })
			setTimeout(() => setAlert(null),3000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => setAlert(null), 3000)
			}
		} catch (error) {
			console.log(error)
		}
	}

    return(
        <>
        <Form className='my-4' onSubmit={register}>
		<AlertMessage info={alert} />
            <Form.Group>
                <Form.Control type='text' placeholder='username...' name='username'onChange={onChangeRegisterForm} required/>
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='password...' name='password'onChange={onChangeRegisterForm} required/>
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='confirm password...' name='confirmPassword'onChange={onChangeRegisterForm} required/>
            </Form.Group>
            <Button type='submit' variant='danger'>Register</Button>
        </Form>
        <p>Already have an account?
            <Link to='/login'>
                <Button variant='info' className='ml-2'size='sm'>Login</Button>
            </Link>
        </p>
        </>
    )
}

export default Register