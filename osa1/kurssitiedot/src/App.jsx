const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({part, exercise}) => {
  return <p>{part} {exercise}</p>
}

const Content = ({parts}) => {
     let result = parts.map((item) =>  {
      return <Part part={item.name} exercise={item.exercises} key={item.id}/>
     })
     return result
}

const Total = ({parts}) => {
      let exercise_count = 0 
      parts.map((item) => exercise_count+= item.exercises)
      return <p>Number of exercises {exercise_count}</p>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )

}

export default App