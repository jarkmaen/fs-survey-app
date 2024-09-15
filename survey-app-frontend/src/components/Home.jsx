import userService from '../services/user'
import { useState } from 'react'

const Home = () => {
    const [user, setUser] = useState(null)
    const handleGetUser = () => {
        const user = userService.getUser()
        setUser(user)
        console.log(user)
    }
    return (
        <div>
            <button onClick={handleGetUser}>Get user</button>
        </div>
    )
}

export default Home