import Header from './components/Header'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Survey from './components/Survey'
import SurveyForm from './components/SurveyForm'
import SurveyList from './components/SurveyList'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { useClearUser, useInitialization } from './hooks/index'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function App() {
    const stateInitializer = useInitialization()
    const clearUser = useClearUser()
    const user = useSelector(({ user }) => user)
    useEffect(() => {
        stateInitializer()
    }, [])
    const logout = async () => {
        clearUser()
    }
    return (
        <Container>
            <Header user={user} logout={logout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-survey" element={<SurveyForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/surveys" element={<SurveyList />} />
                <Route path="/surveys/:id" element={<Survey />} />
            </Routes>
        </Container>
    )
}

export default App
