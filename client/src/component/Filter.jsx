function Filter({ search, setSearch }) {
    const handleSearchChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    return (
        <div className='relative mt-4 w-full'>
            <span className='absolute h-[24px] inset-y-0 my-[auto] left-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
            <input className='bg-stone-700 px-3 py-2 pl-[48px] hover:bg-stone-600 focus:bg-stone-600 hover:transition-colors focus:transition-colors' value={search} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter