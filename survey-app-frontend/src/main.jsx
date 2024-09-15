import App from './App'
import ReactDOM from 'react-dom/client'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)