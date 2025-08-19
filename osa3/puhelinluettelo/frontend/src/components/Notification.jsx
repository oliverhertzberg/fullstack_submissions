
const Notification = ({message}) => {
    if (!message) return null
    const className = message.toLowerCase().includes('error ') || message.toLowerCase().includes('error:')
        ? 'error' 
        : 'notification'

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification