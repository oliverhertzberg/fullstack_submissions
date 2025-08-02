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

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value} {props.text === 'positive' ? "%" : ""}
      </td>
    </tr>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  return ( 
    <>
      <h1>statistics</h1>
      {all === 0 ? (
      <p>No feedback given</p>
      ) : (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={all} />
          <StatisticLine text={'average'} value={all && (good - bad) / all} />
          <StatisticLine text={'positive'} value={all && ((good / all) * 100)} />
        </tbody>
      </table>
      )}
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App