import React from 'react'

function Progress({ nbQuestions, progress, score, totalPoints, highScore }) {
    return (
        <div>
            <header className='progress'><progress id="file" max={nbQuestions} value={progress}></progress>
                <p>Question {progress + 1}/{nbQuestions}</p>
                <p>{score}/{totalPoints}</p>
            </header>
        </div>
    )
}

export default Progress