const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({part, exercise}) => {
  return <p>{part} {exercise}</p>
}

const Content = (props) => {
  return (
    <>
      <Part part={props.p1} exercise={props.ex1}/>
      <Part part={props.p2} exercise={props.ex2}/>
      <Part part={props.p3} exercise={props.ex3}/>
    </>
  )
}

const Total = ({e1, e2, e3}) => {
      return <p>Number of exercises {e1 + e2 + e3}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  console.log(part1.exercises)

  return (
    <div>
      <Header course={course}/>
      <Content  p1={part1.name} ex1={part1.exercises} p2={part2.name} ex2={part2.exercises} p3={part3.name} ex3={part3.exercises}/>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}/>
    </div>
  )

}

export default App