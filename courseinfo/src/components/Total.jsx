const Total = ({ course }) => {
	const { parts } = course
	const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
	return <strong>total exercises {total}</strong>
}
export default Total
