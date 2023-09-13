import { useState } from 'react'

function PersonForm({ onSubmit }) {
    const [newPerson, setNewPerson] = useState({ name: '', number: '' })

    const handleNameChange = (event) => {
        setNewPerson({ ...newPerson, name: event.target.value })
    }

    const handleNumberChange = (event) => {
        setNewPerson({ ...newPerson, number: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(newPerson, () => setNewPerson({ name: '', number: '' }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newPerson.name} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newPerson.number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm