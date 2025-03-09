import { useState, useEffect } from 'react'
import personaService from './services/personas'

const App = () => {

  const [personas, setPersonas] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)

  useEffect(() => {
    personaService
      .getAll()
      .then(personasIniciales => {
        setPersonas(personasIniciales)
        console.log(personasIniciales)
      })
  }, [])

  const repetido = (nombre) => personas.some(persona => persona.name === nombre);

  const addPersona = (event) => {
    event.preventDefault()

    if (repetido(newName)) {
      const confirmUpdate = window.confirm(`${newName} ya existe, ¿desea actualizar el número telefónico?`);

      if (confirmUpdate) {
        const personaToUpdate = personas.find(persona => persona.name === newName);
        const updatedPersona = { ...personaToUpdate, number: newNumber };

        personaService
          .update(personaToUpdate.id, updatedPersona)
          .then(() => {
            setPersonas(personas.map(persona =>
              persona.id !== personaToUpdate.id ? persona : updatedPersona
            ));
            setNewName('');
            setNewNumber('');
            setOkMessage(`Updated ${updatedPersona.name}`)
            setTimeout(() => {
              setOkMessage(null)
            }, 3000)
          })
          .catch(error => {
            console.error("Error al actualizar:", error);
          });
          return console.log("Actualizacion completada")
      } else {
        setNewName('');
        setNewNumber('');
        return console.log("Actualizacion cancelada")
      }
    }

    const personaObject = {
      name: newName,
      number: newNumber,
    }

    personaService
      .create(personaObject)
      .then(nuevaPersona => {
        setPersonas(personas.concat(nuevaPersona))
        setNewName('')
        setNewNumber('')
        setOkMessage(`Added ${personaObject.name}`)
        setTimeout(() => {
          setOkMessage(null)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const clickDeleteOf = id => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta persona?");
    if (confirmDelete) {
      personaService
        .deletePersona(id)
        .then(() => {
          setPersonas(personas.filter(persona => persona.id !== id));
          const encontrado = personas.filter(persona => persona.id == id)
          setOkMessage(`Deleted ${encontrado[0].name}`)
          setTimeout(() => {
            setOkMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
        });
    } else {
      console.log("Eliminación cancelada");
    }
  }

  const personasToShow = busqueda.trim() ? personas.filter((persona) => persona.name.toLowerCase().includes(busqueda.toLowerCase())) : personas;

  return (
    <div>
      <Search busqueda={busqueda} event={handleBusquedaChange} />
      <h2>Phonebook</h2>
      <NotificationOk message={okMessage} />
      <Formulario addPersona={addPersona} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {personasToShow.map(persona => (
          <Persona key={persona.id} persona={persona} clickDelete={() => clickDeleteOf(persona.id)} />
        ))}
      </ul>
    </div>
  )
}

const Persona = (props) => <li>{props.persona.name} {props.persona.number} <button onClick={props.clickDelete}> Delete</button></li>

const Search = (props) => <div><label>Search: </label><input value={props.busqueda} onChange={props.event} /></div>

const Formulario = (props) => {
  return (
    <form onSubmit={props.addPersona}>
      <div><label>Name: </label><input value={props.newName} onChange={props.handleNameChange} /></div>
      <div><label>Number: </label><input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button type="submit">Add</button></div>
    </form>
  )
}

const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const NotificationOk = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="ok">
      {message}
    </div>
  )
}

export default App