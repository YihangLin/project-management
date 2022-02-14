import Navbar from './components/Navbar';
import './scss/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Completed from './pages/Completed';
import Design from './pages/Design';
import Development from './pages/Development';
import Marketing from './pages/Marketing';
import MyTasks from './pages/MyTasks';
import InProgress from './pages/Inprogress';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Navbar />

      <div className='main'>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/completed' element={ <Completed /> } />
          <Route path='/design' element={ <Design /> } />
          <Route path='/development' element={ <Development /> } />
          <Route path='/marketing' element={ <Marketing /> } />
          <Route path='/mytasks' element={ <MyTasks /> } />
          <Route path='/inprogress' element={ <InProgress /> } />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
