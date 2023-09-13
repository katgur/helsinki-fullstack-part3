function Alert({ message }) {
    return (
        message && <div className={message.type}>{message.text}</div>
    )
}

export default Alert