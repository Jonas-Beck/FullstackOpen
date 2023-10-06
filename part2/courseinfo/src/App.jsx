const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>Total of {sum} exercises</strong></p>

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
)

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)

const Course = ({ course, title }) => (
    <div>
        <Header course={title} />
        {course.map((course) => (
            <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total sum={course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} />
            </div>
        ))}
    </div>
)

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3,
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ]

    return <Course title={"Web development curriculum"} course={courses} />
}

export default App
