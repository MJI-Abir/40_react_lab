import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskManager from './components/home/home'
import Home from './components/home/todo'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TaskManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
