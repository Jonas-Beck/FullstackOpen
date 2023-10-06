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

export default Course