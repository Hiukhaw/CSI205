import { useEffect, useState, useRef } from "react";
import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import { fetchTodos } from "../Data/todos";

const Todos = () => {
  //todosraw->filter->todos
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);

  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(3);

  const newId = useRef();
  const newTitle = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setCurPage(1);
  }, []); //filter and pagination

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]); //bypass filter

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]); //bypass filter

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else {
      if (curPage > numPages) setCurPage(numPages);
      else if (curPage < 1) setCurPage(1);
    }
  }, [numPages]); //bypass pagination

  const WaitingClick = (id) => {
    console.log(id);

    const selectedTodo = todosRaw.find((todo) => todo.id === id);
    selectedTodo.completed = true;
    setTodosRaw([...todosRaw]);
  };

  const deleteClick = (id) => {
    const remain = todosRaw.filter((todo) => todo.id !== id);
    setTodosRaw(remain);
  };
  //modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveClick = (id, title) => {
    if (title.trim() !== "") {
      const newTodo = {
        id: id,
        title: title,
        completed: false,
      };
      setTodosRaw([...todosRaw, newTodo]);
    }
    handleClose();
  }

  //useEffect(() => {
  //   console.log(`onlyWaiting: ${onlyWaiting}`);
  //}, [onlyWaiting]);
  return (
    <>
      {/*--------------------modal-----------------------------*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button onClick={()=> newTitle.current.focus()}
              variant="primary" 
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
            &nbsp;ADD TODO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID :</Form.Label>
              <Form.Control
                ref={newId}
                value={
                  todosRaw.reduce((prev, todo) => {
                    return todo.id > prev ? todo.id : prev;
                  }, -1) + 1
                }
                disabled
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>TiTle :</Form.Label>
              <Form.Control 
                ref={newTitle}
                placeholder="ใส่ Todo ID"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClick(newId.current.value, newTitle.current.value)
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/*--------------------modal-----------------------------*/}
      {/*filter */}
      <Form>
        <div className="d-flex mt-3 align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="custom-switch" //label='Check this switch'
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            Show only &nbsp;
            <Button variant="warning">
              Waiting &nbsp;<i className="bi bi-clock"></i>
            </Button>
          </div>
          <Form.Select
            aria-label="Defult select exemple "
            className="w-25"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 item per page</option>
            <option value={10}>10 item per page</option>
            <option value={50}>50 item per page</option>
            <option value={100}>100 item per page</option>
          </Form.Select>
        </div>
      </Form>

      {/*table*/}
      <div className="mt-3">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "3rem" }}>
                ID
              </th>
              <th className="text-center">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed &nbsp;
                <Button
                  onClick={() => {
                    handleShow();
                  }}
                >
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              //start = (curpage - 1) * itemsPerPage. = 0
              //stop = curPage * itemsPerPage - 1 = 4
              todos
                .filter((todo, index) => {
                  return (
                    index >= (curPage - 1) * itemsPerPage &&
                    index <= curPage * itemsPerPage - 1
                  );
                })
                .map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <th className="text-center">
                        <h5>
                          <Badge bg="secondary">{todo.id}</Badge>
                        </h5>
                      </th>
                      <td>{todo.title}</td>
                      <td className="text-end">
                        <div className="d-flex align-items-center gap-2 justify-content-end">
                          {todo.completed ? (
                            <Badge bg="success">done</Badge>
                          ) : (
                            <Button
                              variant="warning"
                              onClick={() => WaitingClick(todo.id)}
                            >
                              Waiting &nbsp;<i className="bi bi-clock"></i>
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            onClick={() => deleteClick(todo.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </Table>
      </div>

      {/*page control*/}
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage <= 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurPage((p) => p - 1)}
        >
          Previous
        </Button>
        &nbsp;
        <Button variant="outline-primary">
          <span>
            {curPage}&nbsp;/&nbsp;{numPages}
          </span>
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={
            () => curPage < numPages && setCurPage((p) => p + 1)
            //{if (curPage < numPages) setCurPage((p)=> p+1)}
          }
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>
    </>
  );
};

export default Todos;
