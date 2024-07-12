import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import phonebook from './services/phonebook'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		phonebook.getAll().then((initialContacts) => setPersons(initialContacts))
	}, [])

	const addContact = (e) => {
		e.preventDefault()
		const existingContact = persons.find(
			(person) =>
				person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
		)
		if (existingContact) {
			if (
				confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const updatedContact = { ...existingContact, number: newPhone }
				phonebook.update(existingContact.id, updatedContact).then((res) => {
					setPersons(
						persons.map((person) =>
							person.id !== existingContact.id ? person : res
						)
					)
				})
				toast.success(`${existingContact.name} updated successfully`, {
					position: 'top-center',
					autoClose: 2500,
				})
				setNewName('')
				setNewPhone('')
			}
		} else {
			const newContact = {
				name: newName,
				number: newPhone,
			}

			phonebook.create(newContact).then((returnedObject) => {
				setPersons(persons.concat(returnedObject))
			})
			toast.success(`added ${newContact.name}`, {
				position: 'top-center',
				autoClose: 2500,
			})

			setNewName('')
			setNewPhone('')
		}
	}

	const deleteContact = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			phonebook
				.deleteContact(id)
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id))
				})
				.catch(() => {
					setPersons(persons.filter((person) => person.id !== id))
					toast.error(`${name} has already been removed`, {
						position: 'top-center',
						autoClose: 2500,
					})
				})
		}
	}

	const contactToShow = persons.filter((person) => {
		return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	})

	return (
		<div>
			<h1>Phonebook</h1>
			<ToastContainer />
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
			<Person contacts={contactToShow} deleteContact={deleteContact} />
		</div>
	)
}

export default App
