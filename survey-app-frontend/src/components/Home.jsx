import SurveysList from './SurveyList'
import { Col, Container, Row } from 'react-bootstrap'

const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Active Surveys</h2>
                    <SurveysList />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <h2>Closed Surveys</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Home