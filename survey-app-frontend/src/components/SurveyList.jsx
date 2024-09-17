import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SurveyList = () => {
    const surveys = useSelector(({ surveys }) => surveys)
    return (
        <div>
            <h2>Surveys</h2>
            <ListGroup>
                {surveys.map((survey) => (
                    <ListGroupItem key={survey._id}>
                        {survey.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    )
}

export default SurveyList