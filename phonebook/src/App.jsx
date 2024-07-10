import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:3000/persons')
			.then((res) => setPersons(res.data))
	}, [])

	const addContact = (e) => {
		e.preventDefault()
		if (
			persons.find(
				(person) =>
					person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
			)
		) {
			alert(`${newName} is already added to phonebook`)
			return
		}
		const newContact = {
			name: newName,
			number: newPhone,
			id: persons.length + 1,
		}
		setPersons(persons.concat(newContact))
		setNewName('')
		setNewPhone('')
	}

	const contactToShow = persons.filter((person) => {
		return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	})

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter filter={filter} setFilter={setFilter} />
			<h2>add new</h2>
			<PersonForm
				newName={newName}
				phoneNumber={newPhone}
				addNewContact={addContact}
				setNewName={setNewName}
				setNewPhone={setNewPhone}
			/>
			<h2>Numbers</h2>
			<Person contacts={contactToShow} />
		</div>
	)
}

export default App
