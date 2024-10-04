import { ProgressBar } from 'react-bootstrap'

const QuestionResults = ({ question }) => {
    const getCounts = [
        ...question.options,
        ...Object.keys(
            question.responses
                .filter((response) => {
                    if (Array.isArray(response)) {
                        return response.some((r) => !question.options.includes(r))
                    }
                    return !question.options.includes(response)
                })
                .reduce((accumulator, response) => {
                    let key
                    if (Array.isArray(response)) {
                        key = response.filter((r) => !question.options.includes(r)).join(', ')
                    } else {
                        key = response
                    }
                    accumulator[key] = (accumulator[key] || 0) + 1
                    return accumulator
                }, {})
        )
    ]
    return (
        <div>
            {getCounts.map((option, i) => {
                const count = question.responses.filter((response) =>
                    Array.isArray(response) ? response.includes(option) : response === option
                ).length
                const percentage = (count / question.responses.length) * 100
                return (
                    <div key={i}>
                        <div className="custom-progress-bar-container">
                            <ProgressBar className="custom-progress-bar" now={percentage} />
                            <div className="custom-progress-bar-text">
                                <span style={{ textAlign: 'left' }}>
                                    {option} ({count})
                                </span>
                                <span style={{ textAlign: 'right' }}>{percentage.toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="question-result-bottom" />
        </div>
    )
}

export default QuestionResults
