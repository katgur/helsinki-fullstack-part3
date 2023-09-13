function Filter({ search, setSearch }) {
    const handleSearchChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    return (
        <>
            filter shown with <input value={search} onChange={handleSearchChange} />
        </>
    )
}

export default Filter