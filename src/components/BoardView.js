import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBoard1, setBoard2, setBoard3 } from '../actions/HomeActions'
import Issue from '../models/Issue'
import Board from '../models/Board'

const BoardView = () => {
    let location = useLocation();
    let history = useHistory();
    let [board, setBoard] = useState(location.state.board)
    let [id, setId] = useState(location.state.id)
    let [dragIssue, setDragIssue] = useState([])
    let priorities = [1,2,3,4]
    let dispatch = useDispatch();

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
            
            <div id={"boardViewNavBar"}>
                <ul id={"boardViewUl"}>
                <li className={"boardViewLi"}>{board.name}</li>
                <li id={"renameBtn"} className={"boardViewLi"} onClick={displayRenameForm}>Rename</li>
                <li id={"addIssueBtn"} className={"boardViewLi"} onClick={displayAddIssueForm}>Add</li>
                <li id={"deleteBtn"} className={"boardViewLi"} onClick={displayDeleteForm}>Delete</li>
                </ul>
            </div>
            <div className={"columnsContainer"}>
                {board.columns.map((column, i) =>
                    <div key={i} id={i} className={"kanbanColumn"} onDrop={dropHandler} onDragOver={dragOverHandler}>
                        <div id={"columnName"}>{column.name}</div>
                        <ul id={"columnIssues"} onDrop={dropHandler} onDragOver={dragOverHandler}>
                            {column.issues
                                .sort((a, b) => a.priority - b.priority)
                                .map((issue, j) => 
                                <li key={j} id={j} className={'issue'} draggable={'true'} onDragStart={dragstartHandler}>
                                    <h3>{issue.title} - {issue.priority}</h3>
                                </li>
                            )}
                        </ul>
                    </div>            
                )}
            </div>
            <div id={'trashCan'} onDrop={dropHandler} onDragOver={dragOverHandler}>
                    <h2>Trash</h2>
                </div>
            <div id={"createIssueContainer"} className={"createIssueContainer"}>
                <h3>Create a new Issue</h3>
                <div>
                    <label>Issue title</label>
                    <input type={"text"} name={"issueTitle"} id={"issueTitle"} placeholder={"Issue title..."}/>
                </div>
                <div>
                    <label>Category</label>
                    <select id="category" name="category">
                        {board.columns.map((column, i) =>
                            <option key={i} value={i}>{column.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    {
                        priorities.map((level, i) =>
                            <label key={i} className="priorityRadioBtn">{level}
                                <input type="radio" name="radio" value={level} />
                            </label>
                        )
                    }
                </div>
                <button onClick={addIssue}>Add Issue</button>
            </div>
            <div id={"renameBoardSection"} className={"renameBoardSection"}>
                    <h2>Rename Kanban Board</h2>
                    <label>New Board Name</label>
                    <input type={'text'} name={'newBoardName'} id={'newBoardName'} placeholder={'New name...'}/>
                    <button id={"renameBtn"} onClick={renameBoard}>Rename</button>
                    <button id={"renameCancelBtn"} onClick={displayRenameForm}>Cancel</button>
            </div>
            <div id={"deleteBoardSection"} className={"deleteBoardSection"}>
                <h2>Are you sure you want to delete the board. All progress will be lost!</h2>
                <button id={"deleteBtn"} onClick={deleteBoard}>Delete</button>
                <button id={"deleteCancelBtn"} onClick={displayDeleteForm}>Cancel</button>
            </div>
        </div>

    )
}

export default BoardView