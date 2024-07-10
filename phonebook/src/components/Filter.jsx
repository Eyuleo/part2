const Filter = ({ filter, setFilter }) => {
	return (
		<>
			<label htmlFor='filter'>filter shown with</label>
			<input
				id='filter'
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</>
	)
}

export default Filter
