
import { Route,Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './components/Layout'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4001';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
