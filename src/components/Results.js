import React from 'react'

function Results({ score, totalPoints, highScore }) {
    return (
        <>
            <p className="result"><span></span> You scored <strong>{score}</strong> out of {totalPoints} ({(score / totalPoints) * 100}%)</p>
            <p class="highscore">(Highscore: {highScore} points)</p>
        </>
    )
}

export default Results