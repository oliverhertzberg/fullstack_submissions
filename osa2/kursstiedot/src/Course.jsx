const Header = (props) => {
  if(!props.course) return
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
    if (!course || course.length < 1) return <h1>no courses to show</h1>
    return (
        <div>
          {course.map(item => (
            <div key={item.id}>
              <Header course={item.name}/>
              <Content parts={item.parts}/>
              <Total parts={item.parts}/>
            </div>
          ))}
        </div>
    )
}

export default Course