import { Alert, Container } from 'react-bootstrap'
import { clear } from '../reducers/notification'
import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {
    const info = useSelector(({ notification }) => notification)
    const dispatch = useDispatch()
    if (!info.message) {
        return null
    }
    return (
        <Container className="notification-alert-container">
            <Alert
                className={`notification-alert-${info.type}`}
                closeVariant="white"
                dismissible
                onClose={() => dispatch(clear())}
            >
                {info.message}
            </Alert>
        </Container>
    )
}

export default Notification
