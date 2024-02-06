import './App.css';
import { Statistics } from './components/statistics';
import { Home } from './components/home';
import Navigation from './components/navigation';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/footer';
import { useNameing } from './components/hooks/useNaming';


function App() {

  useNameing("Main page")

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
