const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return courses.map(course => <Course course={course} key={course.id} /> ) 
}

const Course = (props) => {
  
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts}/>
    </div>
  )
}

const Header = (props) => <h2>{props.name}</h2>

const Content = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}  />)}
      <Total total={total} />
    </div>
  )
}

const Part = (props) => {
  return (
      <div>{props.name} {props.exercises}</div>
  )
}

const Total = (props) => <div>Total of {props.total} excercices</div>

export default App