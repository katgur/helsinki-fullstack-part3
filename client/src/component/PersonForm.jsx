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
        <form className='mt-2 bg-stone-800 rounded p-4 w-full' onSubmit={handleSubmit}>
            <label className='block'>
                <span className='text-sm text-gray-50 mr-2'>
                    name
                </span>
                <input className='rounded px-2 py-1 bg-stone-300 text-black hover:bg-stone-400 hover:transition-colors focus:bg-stone-400 focus:transition-colors' value={newPerson.name} onChange={handleNameChange} />
            </label>
            <label className='block mt-4'>
                <span className='text-sm text-gray-50 mr-2'>
                    number
                </span>
                <input className='rounded px-2 py-1 bg-stone-300 text-black hover:bg-stone-400 hover:transition-colors focus:bg-stone-400 focus:transition-colors' value={newPerson.number} onChange={handleNumberChange} />
            </label>
            <button className='block mt-5 px-4 py-2 bg-blue-600 shadow-md rounded hover:bg-blue-500 hover:transition-colors' type="submit">Add contact</button>
        </form>
    )
}

export default PersonForm