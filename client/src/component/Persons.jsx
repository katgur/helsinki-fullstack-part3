function Persons({ persons, search, onDeleteButtonClick }) {
    return (
        <ul className='mt-5'>
            {
                persons
                    .filter(person => person.name.toLowerCase().includes(search) || person.number.includes(search))
                    .map(person => {
                        return (
                            <li className='flex justify-between items-center border-b-gray-500 border-b-[1px] py-4' key={person.id}>
                                <p>
                                    <span className='text-sm text-gray-500'>
                                        {person.name}
                                    </span>
                                    <span className='ml-3 text-gray'>
                                        {person.number}
                                    </span>
                                </p>
                                <button className='text-sm px-2 py-1 bg-red-700 shadow-md rounded hover:bg-red-600 hover:transition-colors' onClick={() => onDeleteButtonClick(person)}>delete</button>
                            </li>
                        )
                    })
            }
        </ul>
    )
}

export default Persons