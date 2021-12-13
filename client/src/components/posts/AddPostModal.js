
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'



const AddPostModal = () => {
	// Contexts
	

	return (
		<Link to="/create">
          <Button variant="outline-warning" className="ml-2" size="sm" style={{margin:'10px 45%'}}>
            Add
          </Button>
        </Link>
	)
}

export default AddPostModal
