import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBoard1, setBoard2, setBoard3 } from '../actions/HomeActions'
import Issue from '../models/Issue'
import Board from '../models/Board'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import trashCan from '../bin.png';
import ReactHtmlParser from 'react-html-parser';

const BoardView = () => {
    let location = useLocation();
    let history = useHistory();
    let [board, setBoard] = useState(location.state.board)
    let [id, setId] = useState(location.state.id)
    let [dragIssue, setDragIssue] = useState([])
    let priorities = [1,2,3,4]
    let dispatch = useDispatch();
    let [show, setShow] = useState(false);
    let [showDelete, setShowDelete] = useState(false);
    let [showAdd, setShowAdd] = useState(false);
    let [showColumn, setShowColumn] = useState(false);
    
    useEffect(() => {
        let boards = JSON.parse(localStorage.getItem('boards'));
        let board;
        if (id === 'board1') {
            board = boards[0];
        } else if (id === 'board2') {
            board = boards[1];
        } else if (id === 'board3') {
            board = boards[2];
        }
        setBoard(board)
    })

    const addIssue = () => {
        let issueTitle = document.getElementById("issueTitle").value;
        let category = document.getElementById("category").value;
        let radios = document.getElementsByName("radio");
        let priority;
        for (let i= 0; i< radios.length; i++){
            if (radios[i].checked){
                priority = i
            }
        }
        appendIssueToColumn(category, issueTitle, priority)
        closeAddIssueModal()
    }

    const appendIssueToColumn = (category, issueTitle, priority) => {
        let issue = new Issue (issueTitle, priority, category);
        let newBoard = {...board}
        newBoard.columns[category].issues = newBoard.columns[category].issues.concat(issue)
        setBoard(newBoard)
        let boards = JSON.parse(localStorage.getItem('boards'));
        if (id === 'board1') {
            boards[0]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard1(board))
        } else if (id === 'board2') {
            boards[1]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard2(board))
        } else if (id === 'board3') {
            boards[2]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard3(board))
        }
    }

    const openRenameBoardModal = () => {
        setShow(true)
    }

    const closeRenameBoardModal = () => {
        setShow(false)
    }

    const openDeleteBoardModal = () => {
        setShowDelete(true)
    }

    const closeDeleteBoardModal = () => {
        setShowDelete(false)
    }

    const openAddIssueModal = () => {
        setShowAdd(true)
    }

    const closeAddIssueModal = () => {
        setShowAdd(false)
    }

    const openRenameColumnModal = () => {
        setShowColumn(true)
    }

    const closeRenameColumnModal = () => {
        setShowColumn(false)
    }

    const removeIssueFromColumn = () => {
        let category = dragIssue[0];
        let index = dragIssue[1];
        let newBoard = {...board};
        let length = newBoard.columns[category].issues.length
        newBoard.columns[category].issues = newBoard.columns[category].issues.slice(0, index).concat((newBoard.columns[category].issues.slice(index, length-1)))
        setBoard(newBoard)
        let boards = JSON.parse(localStorage.getItem('boards'));
        if (id === 'board1') {
            boards[0]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard1(board))
        } else if (id === 'board2') {
            boards[1]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard2(board))
        } else if (id === 'board3') {
            boards[2]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard3(board))
        }
    }
    
    const displayAddIssueForm = () => {
        let visibilityStatus = document.getElementById("createIssueContainer").style.display;
        if(visibilityStatus === 'none') {
            document.getElementById("createIssueContainer").style.display = 'block'
        } else if (visibilityStatus === 'block') {
            document.getElementById("createIssueContainer").style.display = 'none'
        } else {
            document.getElementById("createIssueContainer").style.display = 'block'
        }
    }

    const dragstartHandler = (event) => {
        let column = event.target.parentElement.parentElement.id;
        let issue = event.target.id;
        let theIssue = board.columns[column].issues[issue]
        console.log(issue)
        setDragIssue([column, issue, theIssue])
    }

    const dragOverHandler = (event) => {
        event.preventDefault();
        console.log(event.target.id)
    }

    const dropHandler = (event) => {
        event.preventDefault();
        let category;
        if(event.target.id === 'trashCan'){
            removeIssueFromColumn();
        } 
        else {
         if (event.target.nodeName === 'LI') {
            category = event.target.parentElement.parentElement;
            appendIssueToColumn(category.id, dragIssue[2].title, dragIssue[2].priority)
            removeIssueFromColumn()
        } else if (event.target.nodeName === 'DIV') {
            category = event.target;
            appendIssueToColumn(category.id, dragIssue[2].title, dragIssue[2].priority)
           removeIssueFromColumn()
        } else {
            throw new Error ('Place is not meant to be a drop area')
        }
    }
    }

    const renameBoard = () => {
        let newName = document.getElementById('newBoardName').value;
        let newBoard = {...board, name: newName }
        setBoard({...board, name: newName })
        console.log(board)
        console.log(id)
        let boards = JSON.parse(localStorage.getItem('boards'));
        if (id === 'board1') {
            boards[0]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard1(board))
        } else if (id === 'board2') {
            boards[1]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard2(board))
        } else if (id === 'board3') {
            boards[2]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard3(board))
        }
    }
    
    const displayRenameForm = () => {
        let formVisibility = document.getElementById('renameBoardSection').style.display;
        if (formVisibility === 'none') {
            document.getElementById('renameBoardSection').style.display = 'block';
        } else if (formVisibility === 'block') {
            document.getElementById('renameBoardSection').style.display = 'none';
        } else {
            document.getElementById('renameBoardSection').style.display = 'block';
        }
    }

    const deleteBoard = () => {
        let emptyBoard = new Board('untitled', [])
        let boards = JSON.parse(localStorage.getItem('boards'));
        if (id === 'board1') {
            boards[0]=emptyBoard;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard1(emptyBoard))
        } else if (id === 'board2') {
            boards[1]=emptyBoard;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard2(emptyBoard))
        } else if (id === 'board3') {
            boards[2]=emptyBoard;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard3(emptyBoard))
        }
        history.push({
            pathname: '/',
        })
    }

    const displayDeleteForm = () => {
        let formVisibility = document.getElementById('deleteBoardSection').style.display;
        if (formVisibility === 'none') {
            document.getElementById('deleteBoardSection').style.display = 'block';
        } else if (formVisibility === 'block') {
            document.getElementById('deleteBoardSection').style.display = 'none';
        } else {
            document.getElementById('deleteBoardSection').style.display = 'block';
        }
    }

    return (
        <div className={"boardViewContainer"}>
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand>{board.name}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link id={"addIssueBtn"} onClick={openAddIssueModal}>Add Issue</Nav.Link>
                            <NavDropdown title="Menu" id="dropdown-basic-button" alignRight>
                                <NavDropdown.Item id={"renameBtn"} onClick={openRenameBoardModal}>Rename</NavDropdown.Item>
                                <NavDropdown.Item id={"deleteBtn"}  onClick={openDeleteBoardModal}>Delete Board</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            <div className={"mainBoard"}>
                <Container fluid={true}>
                <Row>
                {board.columns.map((column, i) =>
                    <Col key={i} id={i} className={"kanbanColumn"} onDrop={dropHandler} onDragOver={dragOverHandler}>
                        <h3 id={"columnName"}>{column.name}</h3>
                        <ListGroup id={"columnIssues"} onDrop={dropHandler} onDragOver={dragOverHandler}>
                            {column.issues
                                .sort((a, b) => a.priority - b.priority)
                                .map((issue, j) => 
                                <ListGroup.Item key={j} id={j} className={'issue'} draggable={'true'} onDragStart={dragstartHandler}>
                                    <h3>{issue.title} - {issue.priority}</h3>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>            
                )}
                </Row>
                </Container>
            </div>
            <img src={trashCan} id={"trashCan"} onDrop={dropHandler} onDragOver={dragOverHandler} />
            <Modal show={showAdd} onHide={closeAddIssueModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "#FFE458", margin: "10px", borderRadius: "8px"}}>
                        <Form>
                            <Form.Group controlId={"issueTitle"}>
                                <Form.Label>Issue Title</Form.Label>
                                <Form.Control placeholder="Issue title..."/>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select">
                                    {
                                        board.columns.map((column, i) =>
                                            <option key={i} value={i}>{column['name']}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Row} controlId="issuePrioritySection">
                                <Form.Label as="legend" column sm={12}>
                                    Priority Level
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-danger'>Urgent</span>")}
                                        name="radio"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-warning'>High</span>")}
                                        name="radio"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-info'>Medium</span>")}
                                        name="radio"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={ReactHtmlParser("<span class='badge badge-success'>Low</span>")}
                                        name="radio"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"renameBtn"} onClick={addIssue}>
                            Add
                        </Button>
                        <Button variant="danger" onClick={closeAddIssueModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDelete} onHide={closeDeleteBoardModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Kanban Board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the board?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"deleteBtn"} onClick={deleteBoard}>
                            Delete
                        </Button>
                        <Button variant="danger" onClick={closeDeleteBoardModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show} onHide={closeRenameBoardModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename Kanban Board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className={"renameBoardForm"}>
                            <Form.Group controlId={"newBoardName"}>
                                <Form.Label>New Board Name</Form.Label>
                                <Form.Control name={"newBoardName"} type="text"
                                              placeholder="New name..."/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" id={"renameBtn"} onClick={renameBoard}>
                            Rename
                        </Button>
                        <Button variant="danger" onClick={closeRenameBoardModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

        </div>

    )
}

export default BoardView

/*

<div id={"boardViewNavBar"}>
                <ul id={"boardViewUl"}>
                <li className={"boardViewLi"}>{board.name}</li>
                <li id={"renameBtn"} className={"boardViewLi"} onClick={displayRenameForm}>Rename</li>
                <li id={"addIssueBtn"} className={"boardViewLi"} onClick={displayAddIssueForm}>Add</li>
                <li id={"deleteBtn"} className={"boardViewLi"} onClick={displayDeleteForm}>Delete</li>
                </ul>
            </div>

*/