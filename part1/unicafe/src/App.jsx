import { useState } from "react"

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticsLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = ((bad * -1) + good) / total
    const positive = good / total * 100
    if (good == 0 && neutral == 0 && bad == 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <div>
            <h2>Statistics</h2>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={total} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive} />
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
