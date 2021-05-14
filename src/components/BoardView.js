import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBoard1, setBoard2, setBoard3 } from '../actions/HomeActions'
import Issue from '../models/Issue'

const BoardView = () => {
    let location = useLocation();
    let [board, setBoard] = useState(location.state.board)
    let [id, setId] = useState(location.state.id)
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
        let issue = new Issue (issueTitle, priority, category);
        if (id === 'board1') {
            let newBoard = {...board}
            newBoard.columns[category].issues = newBoard.columns[category].issues.concat(issue)
            setBoard(newBoard)
            let boards = JSON.parse(localStorage.getItem('boards'));
            boards[0]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard1(board))
        } else if (id === 'board2') {
            let newBoard = {...board}
            newBoard.columns[category].issues = newBoard.columns[category].issues.concat(issue)
            setBoard(newBoard)
            let boards = JSON.parse(localStorage.getItem('boards'));
            boards[1]=board;
            localStorage.setItem('boards', JSON.stringify(boards));
            dispatch(setBoard2(board))
        } else if (id === 'board3') {
            let newBoard = {...board}
            newBoard.columns[category].issues = newBoard.columns[category].issues.concat(issue)
            setBoard(newBoard)
            let boards = JSON.parse(localStorage.getItem('boards'));
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

    return (
        <div className={"boardViewContainer"}>
            <div id={"boardViewNavBar"}>
                <ul id={"boardViewUl"}>
                <li className={"boardViewLi"}>{board.name}</li>
                <li className={"boardViewLi"}>Menu</li>
                <li id={"addIssueBtn"} className={"boardViewLi"} onClick={displayAddIssueForm}>Add</li>
                </ul>
            </div>
            <div className={"columnsContainer"}>
                {board.columns.map((column, i) =>
                    <div key={i} id={column.name} className={"kanbanColumn"}>
                        <div id={"columnName"}>{column.name}</div>
                        <div id={"columnIssues"}>
                            {column.issues
                                .sort((a, b) => a.priority - b.priority)
                                .map((issue, j) => 
                                <div key={j} className={'issue'}>
                                    <h3>{issue.title} - {issue.priority}</h3>
                                </div>
                            )}
                        </div>
                    </div>            
                )}
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
        </div>
    )
}

export default BoardView