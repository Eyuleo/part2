import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [filter, setFilter] = useState('')

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
