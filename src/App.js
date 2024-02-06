import './App.css';
import { Statistics } from './components/statistics';
import { Home } from './components/home';
import Navigation from './components/navigation';
import { SwitchTab } from './components/switchTab';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/footer';


function App() {

 return (
  <div className='playfont'>
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
      </Routes>
    </Router>
    <Footer></Footer>
  </div>
    
  );
}

export default App;
