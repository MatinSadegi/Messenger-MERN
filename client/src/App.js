import './assets/styles/App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Home, Auth} from './pages';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    </BrowserRouter>
  )
  
}

export default App;
