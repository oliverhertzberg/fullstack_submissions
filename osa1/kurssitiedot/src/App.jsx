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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  console.log(parts[0].exercises)

  return (
    <div>
      <Header course={course}/>
      <Content  p1={parts[0].name} ex1={parts[0].exercises} p2={parts[1].name} ex2={parts[1].exercises} p3={parts[2].name} ex3={parts[2].exercises}/>
      <Total e1={parts[0].exercises} e2={parts[1].exercises} e3={parts[2].exercises}/>
    </div>
  )

}

export default App