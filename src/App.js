// import './App.css';
import "./styles/global.scss";
import { Routes, Route, Navigate } from 'react-router-dom'
import Generator from './pages/generator';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Generator />} />
      </Routes>
    </div>
  );
}

export default App;
