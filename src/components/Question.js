import React, { useState } from 'react'

function Question({ question, points, options, correctOption }) {
    const [answer, setAnswer] = useState(null);

    const setClassName = (index) => {
        let optionClassName = 'btn btn-option';

        if (answer) {
            if (index === answer) optionClassName += ' answer';
            index === correctOption ? optionClassName += ' correct' : optionClassName += ' wrong';
        }

        return optionClassName
    }

    const clickHandler = (index) => {
        setAnswer(index);
    }

    return (
        <div>
            <h4>{question}</h4>
            <div className="options">
                {options.map((option, index) => <btn className={setClassName(index)} onClick={() => clickHandler(index)}>{option}</btn>
                )}
            </div>
        </div>
    )
}

export default Question