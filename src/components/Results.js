import React from 'react'

function Results({ score, totalPoints }) {
    return (
        <p className="result"><span></span> You scored <strong>{score}</strong> out of {totalPoints} ({(score / totalPoints) * 100}%)</p>
    )
}

export default Results