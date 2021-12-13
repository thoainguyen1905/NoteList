import { Alert, Form } from "react-bootstrap";
import { PostContext } from "../contexts/PostContext";
import NavbarMenu from "../components/layout/NavbarMenu";
import { useContext, useState } from "react";
import Button from "@restart/ui/esm/Button";

function CreateNote() {
  // Contexts
  const { addPost, setShowToast } = useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
 
  const { title, description, url,status } = newPost;
  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
 

  return (
    <>
      <NavbarMenu />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            placeholder="Enter Title"
            onChange={onChangeNewPostForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={onChangeNewPostForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            name="url"
            value={url}
            onChange={onChangeNewPostForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            name="status"
            value={status}
            onChange={onChangeNewPostForm}
          />
        </Form.Group>
        <Button
          variant="outline-warning"
          className="ml-2"
          size="sm"
          style={{ margin: "10px 45%" }}
          type="submit"
          
        >
          ADD
        </Button>
      </Form>
    </>
  );
}

export default CreateNote;
