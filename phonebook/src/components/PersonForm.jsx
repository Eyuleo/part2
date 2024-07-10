const PersonForm = ({
	addNewContact,
	newName,
	phoneNumber,
	setNewName,
	setNewPhone,
}) => {
	return (
		<>
			<form onSubmit={addNewContact}>
				<div>
					<label htmlFor='name'>name:</label>
					<input
						id='name'
						required
						value={newName}
						onChange={(e) => setNewName(e.target.value.trim())}
					/>
				</div>
				<div>
					<label htmlFor='phone'>number:</label>
					<input
						id='phone'
						required
						value={phoneNumber}
						onChange={(e) => setNewPhone(e.target.value.trim())}
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	)
}

export default PersonForm
