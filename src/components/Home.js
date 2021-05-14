import React, { useState, useEffect } from 'react'
import Board from '../models/Board'
import { useSelector, useDispatch } from 'react-redux'
import { setBoard1, setBoard2, setBoard3 } from '../actions/HomeActions'
import { useHistory } from 'react-router-dom'
import Column from '../models/Column'
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal'

import one from '../one.jpeg';
import two from '../two.jpeg';
import three from '../three.jpeg';

const Home = () => {
    const [currentBoard, setCurrentBoard] = useState("board1")
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
     const board1 = useSelector(state => state.home.board1)
    const board2 = useSelector(state => state.home.board2)
    const board3 = useSelector(state => state.home.board3)

    useEffect(() => {
        if (localStorage.getItem('boards') === null) {
            const emptyBoard1 = new Board('untitled', []);
            const emptyBoard2 = new Board('untitled', []);
            const emptyBoard3 = new Board('untitled', []);
            dispatch(setBoard1(emptyBoard1));
            dispatch(setBoard2(emptyBoard2));
            dispatch(setBoard3(emptyBoard3));
            const boards = JSON.stringify([emptyBoard1, emptyBoard2, emptyBoard3]);
            localStorage.setItem('boards', boards)
        } else {
            let boards = JSON.parse(localStorage.getItem('boards'));
            dispatch(setBoard1(boards[0]));
            dispatch(setBoard2(boards[1]));
            dispatch(setBoard3(boards[2]));
        }      
    }, [])

   

    const handleOpenModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const createBoard = () => {
        let id = currentBoard
        console.log(id)
        const boardName = document.getElementById("boardName").value;
        const column1 = document.getElementById("column1").value;
        const column2 = document.getElementById("column2").value;
        const column3 = document.getElementById("column3").value;
        const column4 = document.getElementById("column4").value;
        const column5 = document.getElementById("column5").value;
        const column6 = document.getElementById("column6").value;
        let columns = [column1, column2, column3, column4, column5, column6];
        columns = columns.filter(e => e !== '').map(column => new Column(column, []))
        
        let boards = JSON.parse(localStorage.getItem('boards'));
        let board = new Board(boardName, columns)

        if (id === "board1") {
            dispatch(setBoard1(board))
            boards[0] = board
        } else if (id === "board2") {
            dispatch(setBoard2(board))
            boards[1] = board
        } else if (id === "board3") {
            dispatch(setBoard3(board))
            boards[2] = board
        }
        localStorage.setItem('boards', JSON.stringify(boards))
        redirectToBoard(board, id);
    }

    const handleBoardClick = (event) => {
        let id = event
        setCurrentBoard(id)
        console.log(id)
        if (id === 'board1') {
            if (board1.name === 'untitled') {
                handleOpenModal()
            } else {
                redirectToBoard(board1, id)
            }
        } else if (id === 'board2') {
            if (board2.name === 'untitled') {
                handleOpenModal()
            } else {
                redirectToBoard(board2, id)
            }
        } else if (id === 'board3') {
            if (board3.name === 'untitled') {
                handleOpenModal()
            } else {
                redirectToBoard(board3, id)
            }
        }
    }

    const redirectToBoard = (board, id) => {
        // let board;
        // console.log(board1)
        /*
        if (id === 'board1') {
            board = board1
        } else if (id === 'board2') {
            board = board2
        } else if (id === 'board3') {
            board = board3
        }
        */
        console.log(board);
        history.push({
            pathname: '/boardView',
            state: {
                board: board,
                id: id
            }
        })
    }

    const displayCreateForm = (id, display) => {
        let form = document.getElementById('createBoardContainer');
        if (display) {
            form.style.display = 'block'
        } else {
            form.style.display = 'none';
        }
        setCurrentBoard(id)
    }

    return (
        <div id="homeContainer">
        <div className="homeTitles">
            <h1>Kanban Online</h1>
            <h3>Up Your Productivity</h3>
        </div>
        <div className="boardContainer">
        <CardDeck className={"deck"}>
            <Card className={"boardCards"} onClick={() => handleBoardClick('board1')}>
                <Card.Img variant="top" src={one} />
                <Card.Body>
                    <Card.Title><h2>{board1.name}</h2></Card.Title>
                </Card.Body>
            </Card>
            <Card className={"boardCards"} onClick={() => handleBoardClick('board2')}>
                <Card.Img variant="top" src={two} />
                <Card.Body>
                    <Card.Title><h2>{board2.name}</h2></Card.Title>
                </Card.Body>
            </Card>
            <Card className={"boardCards"} onClick={() => handleBoardClick('board3')}>
                <Card.Img variant="top" src={three} />
                <Card.Body>
                    <Card.Title><h2>{board3.name}</h2></Card.Title>
                </Card.Body>
            </Card>
        </CardDeck>
        </div>
        
        <div id={"createBoardContainer"} className={"createBoardContainer"}>
        <Modal
            isOpen={showModal}
            contentLabel="Minimal Modal Example"
            style={{content: {backgroundColor: '#DDCCBB'}}}
        >
            <h3>Create your own Kanban Board</h3>
            <div>
                <label>Board Name</label>
                <input type={"text"} name={"boardName"} id={"boardName"} placeholder={"Board name..."} />
            </div>
            <div>
                <label>Column 1</label>
                <input type={"text"} name={"column1"} id={"column1"} placeholder={"Column name..."} />
            </div>
            <div>
                <label>Column 2</label>
                <input type={"text"} name={"column2"} id={"column2"} placeholder={"Column name..."} />
            </div>
            <div>
                <label>Column 3</label>
                <input type={"text"} name={"column3"} id={"column3"} placeholder={"Column name..."} />
            </div>
            <div>
                <label>Column 4</label>
                <input type={"text"} name={"column4"} id={"column4"} placeholder={"Column name..."} />
            </div>
            <div>
                <label>Column 5</label>
                <input type={"text"} name={"column5"} id={"column5"} placeholder={"Column name..."} />
            </div>
            <div>
                <label>Column 6</label>
                <input type={"text"} name={"column6"} id={"column6"} placeholder={"Column name..."} />
            </div>
            <button onClick={createBoard}>Create Board</button>
        </Modal>
        </div>
        </div>
    ) 
}

export default Home