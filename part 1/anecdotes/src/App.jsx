import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [maxvotes, setMaxVotes] = useState(0)

  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const maxVotes = (votes) => {
    return votes.reduce((maxIndex, num, i, array) => 
        num > array[maxIndex] ? i : maxIndex, 0);
}

  const handleNextClick = () => {
    const total = anecdotes.length - 1
    const random = randomNumber(0, total)
    setSelected(random)
    console.log(random)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    setMaxVotes(maxVotes(copy))
    console.log(copy)

  }

  return (
    
    <div>
      <Header text={"Anecdote of the day"}/>
      <Anecdotes anecdote={anecdotes[selected]} />
      <Votes vote={votes[selected]}/>
      <Button onClick={handleVoteClick} text={"Vote"} />
      <Button onClick={handleNextClick} text={"Next anecdote"} />
      <Header text={"Anecdote with most votes"}/>
      <Anecdotes anecdote={anecdotes[maxvotes]} />
      <Votes vote={votes[maxvotes]}/>
    </div>
  )
}

const Header = props => <h2>{props.text}</h2>
const Anecdotes = props => <div>{props.anecdote}</div>
const Votes = props => <div>Has {props.vote} votes</div>
const Button = props => <button onClick={props.onClick}> {props.text} </button>

export default App