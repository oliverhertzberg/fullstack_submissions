const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
const Part = ({part, exercise}) => {
  return <p>{part} {exercise}</p>
}

const Content = ({parts}) => {
  if (!parts) return
  let result = parts.map((item) =>  {
  return <Part part={item.name} exercise={item.exercises} key={item.id}/>
  })
  return result
}

const Total = ({parts}) => {
  if (!parts) return
  let exercise_count = parts.reduce((accumulator, item) => accumulator + item.exercises, 0)
  return <b>Number of exercises {exercise_count}</b>
}

const Course = ({course}) => {
  console.log('course: ',course)
    if (!course || !course.name) return
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course