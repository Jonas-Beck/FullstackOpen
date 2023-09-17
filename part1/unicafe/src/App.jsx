import { useState } from "react"

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = ((bad * -1) + good) / total
    const positive = good / total * 100
    return (
        <div>
            <h2>Statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>positive {positive}%</p>
        </div>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <h2>Give Feedback</h2>
            <Button handleClick={handleGoodClick} text={"good"} />
            <Button handleClick={handleNeutralClick} text={"neutral"} />
            <Button handleClick={handleBadClick} text={"bad"} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App