import React from 'react'

function ProgressBar({ questions, progress, score, totalPoints }) {
    const nbOfQuestions = questions.length;
    return (
        <div>
            <header className='progress'><progress id="file" max={nbOfQuestions} value={progress}></progress>
                <p>Question {progress + 1}/{nbOfQuestions}</p>
                <p>{score}/{totalPoints}</p>
            </header>
        </div>
    )
}

export default ProgressBar