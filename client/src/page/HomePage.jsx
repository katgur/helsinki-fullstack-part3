import Filter from '../component/Filter'
import PersonForm from '../component/PersonForm'
import Persons from '../component/Persons'
import personsService from '../service/persons'
import { useState, useEffect } from 'react'

function HomePage({ showMessage }) {
    const [search, setSearch] = useState('')
    const [persons, setPersons] = useState([])

    useEffect(() => {
        personsService.getAll()
            .then(data => {
                setPersons(data)
            })
    }, [])

    const onAddNewPersonClick = (data, reset) => {
        const sameIndex = persons.findIndex(person => person.name === data.name)
        if (sameIndex !== -1) {
            if (window.confirm(`Person with name '${data.name}' is already added to phonebook, replace the old number with the new one ?`)) {
                personsService.update(persons[sameIndex].id, data)
                    .then(data => {
                        showMessage(`Person '${data.name}' is successfully updated`, 'success')
                        const newPersons = persons.filter(person => person.id !== data.id)
                        setPersons([...newPersons, data])
                        reset()
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            showMessage(`Person '${data.name}' was already removed from server`, 'error')
                            const newPersons = persons.filter(person => person.id !== persons[sameIndex].id)
                            setPersons(newPersons)
                        } else {
                            showMessage(error.response.data.error, 'error')
                        }
                    })
            }
        } else {
            personsService.create(data)
                .then(data => {
                    showMessage(`Person '${data.name}' is successfully added`, 'success')
                    setPersons([...persons, data])
                    reset()
                })
                .catch(error => {
                    showMessage(error.response.data.error, 'error')
                })
        }
    }

    const onDeleteButtonClick = (data) => {
        if (window.confirm(`Delete ${data.name} ?`)) {
            personsService.remove(data.id)
                .then(_ => {
                    showMessage(`Person'${data.name}' is successfully deleted`, 'success')
                    const newPersons = persons.filter(person => person.id !== data.id)
                    setPersons(newPersons)
                })
        }
    }

    return (<>
        <h2 className='mt-8 text-xl font-bold text-white'>Add a new person</h2>
        <PersonForm onSubmit={onAddNewPersonClick} />
        <h2 className='mt-8 text-xl font-bold text-white'>Numbers</h2>
        <Filter search={search} setSearch={setSearch} />
        <Persons persons={persons} search={search} onDeleteButtonClick={onDeleteButtonClick} />
    </>)
}

export default HomePage