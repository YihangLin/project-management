import Navbar from './components/Navbar';
import './scss/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Completed from './pages/Completed';
import Design from './pages/Design';
import Development from './pages/Development';
import Marketing from './pages/Marketing';
import MyTasks from './pages/MyTasks';
import InProgress from './pages/Inprogress';
import Notifications from './pages/Notifications';
import Loading from './components/Loading';
import Create from './pages/Create';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {!authIsReady && <Loading />}
      {authIsReady && (
        <BrowserRouter>
        <Navbar />
        <div className='main'>
          <Routes>
            <Route path='/' element={ user ? <Home /> : <Login /> } />
            <Route path='/login' element={ user ? <Home /> : <Login /> } />
            <Route path='/signup' element={ user ? <Home /> : <Signup /> } />
            <Route path='/completed' element={ user ? <Completed /> : <Login /> } />
            <Route path='/design' element={user ? <Design /> : <Login /> } />
            <Route path='/development' element={user ? <Development /> : <Login /> } />
            <Route path='/marketing' element={user ? <Marketing /> : <Login /> } />
            <Route path='/mytasks' element={user ? <MyTasks /> : <Login /> } />
            <Route path='/inprogress' element={user ? <InProgress /> : <Login /> } />
            <Route path='/notifications' element={user ? <Notifications /> : <Login /> } />
            <Route path='/create' element={user ? <Create /> : <Login /> } />
            <Route path='/project/:id' element={user ? <ProjectDetail /> : <Login /> } />
          </Routes>
        </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
