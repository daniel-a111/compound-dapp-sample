import './App.css';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Home from './pages/Home';
import './scss/main.scss';

function App() {
  return (
    <div className="App">
        <Router>
          <div className='page-content'>
            <ReactNotifications />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>   
          </div>
        </Router>
    </div>
  );
}

export default App;
