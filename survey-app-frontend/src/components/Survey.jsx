import SurveyResponse from './SurveyResponse'
import SurveyResults from './SurveyResults'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Survey = () => {
    const { id } = useParams()
    const survey = useSelector(({ surveys }) => surveys.find(s => s._id === id))
    if (!survey) {
        return <div>Survey not found</div>
    }
    if (survey.closed) {
        return <SurveyResults />
    } else {
        return <SurveyResponse />
    }
}

export default Survey