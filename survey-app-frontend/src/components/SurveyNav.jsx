import { Dropdown, Nav } from 'react-bootstrap'
import { SortOption } from '../constants/enums'

const SurveyNav = ({ activeTab, setActiveTab, setSortOption, sortOption }) => {
    const getSortOptionLabel = (option) => {
        if (option === SortOption.LATEST) {
            return 'Latest'
        } else if (option === SortOption.NAME) {
            return 'Name'
        } else if (option === SortOption.TIME) {
            return 'Time'
        } else {
            return 'Latest'
        }
    }
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
                <Dropdown className="survey-nav-dropdown">
                    <Dropdown.Toggle>Sort By: {getSortOptionLabel(sortOption)}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortOption(SortOption.LATEST)}>Latest</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortOption(SortOption.NAME)}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortOption(SortOption.TIME)}>Time</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </div>
    )
}

export default SurveyNav
