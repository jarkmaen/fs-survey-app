import { Nav } from 'react-bootstrap'

const SurveyNav = ({ activeTab, setActiveTab }) => {
    return (
        <div className="survey-nav">
            <Nav
                className="justify-content-center survey-nav-default-border survey-nav-tabs"
                defaultActiveKey={activeTab}
                variant="tabs"
            >
                <Nav.Item>
                    <Nav.Link className="survey-nav-link" eventKey="active" onClick={() => setActiveTab('active')}>
                        Active Surveys
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="survey-nav-link" eventKey="closed" onClick={() => setActiveTab('closed')}>
                        Closed Surveys
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default SurveyNav
