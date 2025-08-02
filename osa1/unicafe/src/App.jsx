import { useState } from 'react'

const Button = (props) => {
  const handleClick = () => {
    props.onClick(prev => prev + 1)
  }
  return (
    <button onClick={handleClick}>{props.text}</button>
  )
}

const Feedback = ({setGood, setNeutral, setBad}) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={setGood} text={'good'}/>
      <Button onClick={setNeutral} text={'neutral'}/>
      <Button onClick={setBad} text={'bad'}/>
    </>
  )
}

const Stats = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App