import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BoardView = () => {
    let [board, setBoard] = useState(null)
    let location = useLocation();

    useEffect(() => {
        setBoard(location.state.board)
        console.log(board)
    }, [])

    return (
        <div>
            <p>What happens</p>
        </div>
    )
}

export default BoardView