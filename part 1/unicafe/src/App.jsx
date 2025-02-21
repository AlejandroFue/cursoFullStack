import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [datos, setDatos] = useState([])
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const promedio = (lista) => lista.reduce((total, dato) => total + dato, 0) / lista.length
  const porcentaje = (num, total) => (num / total) * 100

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const total = updatedGood + neutral + bad
    setAll(total)
    setDatos(datos.concat(1))
    const lista = datos.concat(1)
    setAverage(promedio(lista))
    setPositive(porcentaje(updatedGood, total))
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const total = good + updatedNeutral + bad
    setAll(total)
    setDatos(datos.concat(0))
    const lista = datos.concat(0)
    setAverage(promedio(lista))
    setPositive(porcentaje(good, total))
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const total = good + neutral + updatedBad
    setAll(total)
    setDatos(datos.concat(-1))
    const lista = datos.concat(-1)
    setAverage(promedio(lista))
    setPositive(porcentaje(good, total))
  }

  return (
    <div>
      <Header name={"Give Feedback"} />
      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />
      <Header name={"Statistics"} />
      <History good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

const History = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics values={props} />
    </div>
  )
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.values.good} />
        <StatisticLine text="Neutral" value={props.values.neutral} />
        <StatisticLine text="Bad" value={props.values.bad} />
        <StatisticLine text="All" value={props.values.all} />
        <StatisticLine text="Average" value={props.values.average} />
        <StatisticLine text="Positive" value={props.values.positive + " %"} />
      </tbody>
    </table>
  )
}

const Header = props => <div> <h2> {props.name} </h2> </div>
const Button = props => <button onClick={props.onClick}> {props.text} </button>
const StatisticLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

export default App