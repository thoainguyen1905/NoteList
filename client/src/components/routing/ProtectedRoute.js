import { Route, Navigate, Routes } from "react-router-dom";
import { useContext } from "react";
import { Card, Button, Row, Col, OverlayTrigger } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";
import Dashboard from "../../views/Dashboard";
import SinglePost from "../posts/SinglePost";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated,user:username },
  } = useContext(AuthContext);
  const {
    postState: { post,posts, postsLoading },
    getPosts,
  } = useContext(PostContext);
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
    else {
      
    }
    let body
    if (postsLoading) {
      body = (
        <div className='spinner-container'>
          <Spinner animation='border' variant='info' />
        </div>
      )
    } else if (posts.length === 0) {
      body = (
        <>
          <Card className='text-center mx-5 my-5'>
            <Card.Header as='h1'>Hi {username}</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to LearnIt</Card.Title>
              <Card.Text>
                Click the button below to track your first skill to learn
              </Card.Text>
              
            </Card.Body>
          </Card>
        </>
      )
    } else {
      body = (
        <>
          <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
            {posts.map(post => (
              <Col key={post._id} className='my-2'>
                <SinglePost post={post} />
              </Col>
            ))}
          </Row>
  
          {/* Open Add Post Modal */}
          
            
        </>
      )
    }
  if(!isAuthenticated) return <Navigate to='/login'/>
  else{
    return (
    <>
    <Dashboard/>
    {body}
    </>
      );
  }
  
};
export default ProtectedRoute;
