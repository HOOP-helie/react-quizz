import React, { useState } from 'react'

function Question({ addPoints, nextQuestion, nbQuestions, progress, questions }) {

    const { question, points, options, correctOption } = questions[progress];
    const [answer, setAnswer] = useState(null);

    const setClassName = (index) => {
        let optionClassName = 'btn btn-option';
        if (answer !== null) {
            if (index === answer) optionClassName += ' answer';
            index === correctOption ? optionClassName += ' correct' : optionClassName += ' wrong';
        }
        return optionClassName
    }

    const clickedAnswerHandler = (index) => {
        setAnswer(index);
        if (correctOption === index) addPoints(points)
    }

    const nextQuestionHandler = () => {
        nextQuestion(progress !== nbQuestions - 1)
        setAnswer(null)
    }

    return (
        <div>
            <h4>{question}</h4>
            <div className="options">
                {options.map((option, index) => <button className={setClassName(index)} onClick={() => clickedAnswerHandler(index)}>{option}</button>
                )}
            </div>
            {answer !== null && <button onClick={nextQuestionHandler} className='btn btn-ui'>Next</button>}
        </div>
    )
}

export default Question