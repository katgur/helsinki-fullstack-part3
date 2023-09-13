function Persons({ persons, search, onDeleteButtonClick }) {
    return (
        <ul>
            {
                persons
                    .filter(person => person.name.toLowerCase().includes(search) || person.number.includes(search))
                    .map(person => {
                        return (
                            <li key={person.id}>{person.name} {person.number} <button onClick={() => onDeleteButtonClick(person)}>delete</button></li>
                        )
                    })
            }
        </ul>
    )
}

export default Persons