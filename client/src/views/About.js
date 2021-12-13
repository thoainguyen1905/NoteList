import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarMenu from '../components/layout/NavbarMenu'
import { AuthContext } from '../contexts/AuthContext'

const About = () => {
	return (
        <>
        <NavbarMenu />
		<Row className='mt-5' style={{ marginRight: 0 }}>
			<Col className='text-center'>
				<Button
					variant='primary'
					href='https://www.facebook.com/profile.php?id=100020452566605'
					size='lg'
				>
					Visit my facebook for more tutorials
				</Button>
			</Col>
		</Row>
        </>
	)
}

export default About