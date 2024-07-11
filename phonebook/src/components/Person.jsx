const Person = ({ contacts, deleteContact }) => {
	return contacts.map((contact) => (
		<p key={contact.id}>
			{contact.name} {contact.number}
			<button onClick={() => deleteContact(contact.id, contact.name)}>
				delete
			</button>
		</p>
	))
}

export default Person
