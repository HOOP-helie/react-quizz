import React from 'react'

function StartScreen({ nbQuestions }) {
    return (
        <div className='start'>
            <h2>Welcome to the React Quizz !</h2>
            <h3>{nbQuestions} questions to test your React mastery</h3>
            <button className='btn btn-ui'>Let's start</button>
        </div>
    )
}

export default StartScreen