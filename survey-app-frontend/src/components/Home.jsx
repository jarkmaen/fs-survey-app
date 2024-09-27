import SurveyList from './SurveyList'
import SurveyNav from './SurveyNav'
import { Container } from 'react-bootstrap'
import { useState } from 'react'

const Home = () => {
    const [activeTab, setActiveTab] = useState('active')
    return (
        <div>
            <SurveyNav activeTab={activeTab} setActiveTab={setActiveTab} />
            <Container>
                {activeTab === 'active' ? (
                    <div>
                        <SurveyList closed={false} />
                    </div>
                ) : (
                    <div>
                        <SurveyList closed={true} />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
