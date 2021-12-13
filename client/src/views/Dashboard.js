import NavbarMenu from "../components/layout/NavbarMenu";
import { PostContext } from "../contexts/PostContext";
import SinglePost from "../components/posts/SinglePost";
import { useContext, useEffect } from "react";
import { Card, Button, Row, Col, OverlayTrigger } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import AddPostModal from "../components/posts/AddPostModal";
import { Spinner } from "react-bootstrap";

function Dashboard() {
  const {
    authState,
  } = useContext(AuthContext);
  const {
    postState: { post,posts, postsLoading },
    getPosts,
  } = useContext(PostContext);
  const {user} = authState
  useEffect(() => getPosts(), []);
  let body = null
  
  if (!postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animmation="border" variant="info" />
      </div>
    );
  } else if (posts.length !== 0) {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
        {posts.map((post) => (
          <Col key={post._id} className="my-2">
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>
      </>
    );
  } else {
    body = (
      <>
      <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {user?.username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Website Thoai Nguyen</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary">Learn It</Button>
          </Card.Body>
        </Card>
      </>
    );
  }
  return (
    <>
      <NavbarMenu />
      {body}
      <AddPostModal/>
    </>
  );
}
export default Dashboard;
