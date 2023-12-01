function Alert({ message }) {
    const color = message && message.type === 'error' ? 'red' : 'green'
    return (
        message && <div className={`absolute bottom-2 right-2 rounded bg-${color}-100 w-[300px] text-black p-5 border-l-${color}-700 border-l-4`}>{message.text}</div>
    )
}

export default Alert