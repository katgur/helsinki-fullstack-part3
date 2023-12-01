function Alert({ message }) {
    return (
        message && <div className={`absolute bottom-2 right-2 rounded w-[300px] text-black p-5 border-l-4 ${message.type}`}>{message.text}</div>
    )
}

export default Alert