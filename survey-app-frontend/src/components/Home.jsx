import SurveyList from './SurveyList'
import SurveyNav from './SurveyNav'
import { Container } from 'react-bootstrap'
import { SortOption } from '../constants/enums'
import { useState } from 'react'

const Home = () => {
    const [activeTab, setActiveTab] = useState('active')
    const [sortOption, setSortOption] = useState(SortOption.LATEST)
    return (
        <div>
            <SurveyNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSortOption={setSortOption}
                sortOption={sortOption}
            />
            <Container>
                {activeTab === 'active' ? (
                    <div>
                        <SurveyList closed={false} sortOption={sortOption} />
                    </div>
                ) : (
                    <div>
                        <SurveyList closed={true} sortOption={sortOption} />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
