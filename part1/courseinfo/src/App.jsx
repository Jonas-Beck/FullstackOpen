// Header Component 
// Takes name of course as prop
const Header = (props) => {
    return <h1>{props.course}</h1>
}

// Content Component 
// Takes array of parts and exercises as props
const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]} exercise={props.exercises[0]} />
        <Part part={props.parts[1]} exercise={props.exercises[1]} />
        <Part part={props.parts[2]} exercise={props.exercises[2]} />
      </div>
    ) 
}

// Part Component
// Takes part name and number of exercises as props
const Part = (props) => {
  return <p>{props.part} {props.exercise}</p>
}

// Total Component
// Takes total number of exercises 
const Total = (props) => {
    return <p>Number of exercises {props.total}</p>
}

const App = () => {
    const course = "Half Stack application development"
    // const part1 = "Fundamentals of React"
    // const exercises1 = 10
    // const part2 = "Using props to pass data"
    // const exercises2 = 7
    // const part3 = "State of a component"
    // const exercises3 = 14
    
    // Using Array instead of single value variables
    const parts = ["Fundamentals of React", "Using props to pass data", "State of a component" ]
    const exercises = [10, 7, 14]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} exercises={exercises} /> 
            <Total total={exercises[0] + exercises[1] + exercises[2]} />
        </div>
    )
}

export default App
