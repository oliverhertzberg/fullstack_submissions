import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )

}

const Anecdotes = (props) => {
  const anecdotes_len = props.anecdotes.length
  const [votes, setVotes] = useState(Array(anecdotes_len).fill(0))

  const clickHandler = () => {
    let anecdotes_index
    do { anecdotes_index = Math.floor(Math.random() * anecdotes_len) }
    while(anecdotes_index === props.selected)

    props.setSelected(anecdotes_index)
  }

  const voteHandler = () => {
    setVotes(prev => prev.map((num, index) => {
      if (index === props.selected) return num += 1
      return num
    }))
  }
  const max_index = votes.indexOf(Math.max(...votes))
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {votes[props.selected]} {votes[props.selected] === 1 ? 'vote' : 'votes'}</p>
      <Button onClick={voteHandler} text={"vote"}/>
      <Button onClick={clickHandler} text={"next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[max_index]}</p>
      <p>has {votes[max_index]} {votes[max_index] === 1 ? 'vote' : 'votes'}</p>
    </>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} selected={selected} setSelected={setSelected} />
    </div>
  )
}

export default App