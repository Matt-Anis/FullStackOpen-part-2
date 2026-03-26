const Total = ( { parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
            <strong>
                Number of exercises {totalExercises}
            </strong>
        </p>
    )
}

export default Total;