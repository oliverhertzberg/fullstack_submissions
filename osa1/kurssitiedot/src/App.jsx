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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content  p1={part1} ex1={exercises1} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3}/>
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </div>
  )

}

export default App