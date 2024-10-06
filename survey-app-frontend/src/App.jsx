import './styles.css'
import Header from './components/Header'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import RegisterForm from './components/RegisterForm'
import Survey from './components/Survey'
import SurveyForm from './components/SurveyForm'
import SurveyList from './components/SurveyList'
import PageNotFound from './components/PageNotFound'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useClearUser, useInitialization } from './hooks/index'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function App() {
    const clearUser = useClearUser()
    const location = useLocation()
    const stateInitializer = useInitialization()
    const user = useSelector(({ user }) => user)
    useEffect(() => {
        stateInitializer()
    }, [])
    const logout = async () => {
        clearUser()
    }
    return (
        <div>
            <Header isHome={location.pathname === '/'} logout={logout} user={user} />
            <Notification />
            <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/create-survey" element={<SurveyForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/surveys" element={<SurveyList />} />
                <Route path="/surveys/:id" element={<Survey />} />
            </Routes>
        </div>
    )
}

export default App
