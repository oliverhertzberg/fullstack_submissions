const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({part, exercise}) => {
  console.log("part in Part component: ", part)
  console.log("exercise in Part component :", exercise)
  return <p>{part} {exercise}</p>
}

const Content = ({parts}) => {
     let result = parts.map((item) =>  {
      return <Part part={item.name} exercise={item.exercises}/>
     })
     return result
}

const Total = ({parts}) => {
      let exercise_count = 0 
      parts.map((item) => exercise_count+= item.exercises)
      return <p>Number of exercises {exercise_count}</p>
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

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )

}

export default App