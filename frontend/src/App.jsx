import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components & pages
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
