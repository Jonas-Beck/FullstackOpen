import { useState } from "react"

const DisplateAnecdote = ({anecdotes, votes, selected}) => {
    return (
        <>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
        </>
    )
}

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.from({ length: anecdotes.length }, () => 0))

    const RandomAnecdote = () => {
        do {
            var random = Math.floor(Math.random() * anecdotes.length)
        } while (random == selected)
        setSelected(random)
    }

    const VoteAnecdote = () => {
        const updatedVotes = [...votes]
        updatedVotes[selected] += 1
        setVotes(updatedVotes)
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <DisplateAnecdote anecdotes={anecdotes} votes={votes} selected={selected}/>
            <button onClick={VoteAnecdote}>vote</button>
            <button onClick={RandomAnecdote}>Next Anecdote</button>
            <h2>Anecdotes with most votes</h2>
            <DisplateAnecdote anecdotes={anecdotes} votes={votes} selected={votes.indexOf(Math.max.apply(null, votes))}/>
        </div>
    )
}

export default App
