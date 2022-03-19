import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import home from '../assets/home.svg';
import tasks from '../assets/tasks.svg';
import notifications from '../assets/notifications.svg';
import logoutImg from '../assets/logout.svg';
import design from '../assets/design.svg';
import development from '../assets/development.svg';
import marketing from '../assets/marketing.svg';
import completed from '../assets/completed.svg';
import inprogress from '../assets/inprogress.svg';
import add from '../assets/add.svg';

import '../scss/Navbar.scss';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDocument } from '../hooks/useDocument';

const Navbar = () => {
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const { document } = useDocument('users', user?.id);

  return (
    <nav>
      <div className='container navbar'>
        <div className='logo'>
          <Link to='/' onClick={() => setMobileSidebar(false)}><img src={logo} alt="logo" /></Link>
        </div>
        
        {user ? 
          <div className='desktop-user'>
            <Link to='/notifications'>
              <img src={notifications} alt="notifications" />
              { document && document.newMsg && <span></span>}
            </Link>
            <span>{user!.displayName}</span>
            <div className='profile'>
              <img src={user?.photoURL || undefined} alt="user profile" />
            </div>
            {!isPending && 
              <div className='desktop-logout' onClick={logout}>
                <img src={logoutImg} alt="logout" /><span>Logout</span>
              </div>
            }
            {isPending &&
              <div className='desktop-logout'>
                <img src={logoutImg} alt="logout" /><span>Loading</span>
              </div>
            }
          </div>
        : 
          <div className='desktop-links'>
            <Link to ='/login'>Login</Link>
            <Link to ='/signup'>Signup</Link>
          </div>
        }


        <div className='menu' onClick={() => setMobileSidebar(prev => !prev)}>
          <img src={menu} alt="menu" />
        </div>

        {/* sidebar for mobiles */}
        <div className={`mobile-sidebar ${mobileSidebar ? '' : 'disable-mobile-sidebar'}`}>
          {user ? 
            <div className='mobile-sidebar-user'>
              <div className='profile'>
                <img src={user?.photoURL || undefined} alt="user profile" />
              </div>
              <div>
                <span>{user!.displayName}</span>
                <Link to='/notifications' onClick={() => setMobileSidebar(false)}>
                  <img src={notifications} alt="notifications" />
                  {document && document.newMsg && <span></span>}
                </Link>
              </div>
            </div>
          :
            <div className='mobile-links' onClick={() => setMobileSidebar(false)}>
              <Link to ='/login'>Login</Link>
              <Link to='/signup'>Singup</Link>
            </div>
          }
          

          <div className='mobile-sidebar-links'>
            <Link onClick={() => setMobileSidebar(false)} className='create' to='/create'><img src={add} alt="add" />New Project</Link>
            <p>Dashboard:</p>
            <ul onClick={() => setMobileSidebar(false)}>
              <li><NavLink to="/"><img src={home} alt="home" />Home</NavLink></li>
              <li><NavLink to="/inprogress"><img src={inprogress} alt="inprogress" />In Progress</NavLink></li>
              <li><NavLink to="/completed"><img src={completed} alt="completed" />Completed</NavLink></li>
              <li><NavLink to="/mytasks"><img src={tasks} alt="tasks" />My Tasks</NavLink></li>
            </ul>
          </div>

          <div className='mobile-sidebar-categories'>
            <p>Categories:</p>
            <ul onClick={() => setMobileSidebar(false)}>
              <li><NavLink to="/development"><img src={development} alt="development" />Develeopment</NavLink></li>
              <li><NavLink to="/design"><img src={design} alt="design" />Design</NavLink></li>
              <li><NavLink to="/marketing"><img src={marketing} alt="marketing" />Marketing</NavLink></li>
            </ul>
          </div>

          { user &&
          <>
            {!isPending &&
              <div className='mobile-sidebar-logout' onClick={() => {logout(); setMobileSidebar(false);}}>
                <img src={logoutImg} alt="logout" />Logout
              </div>
            }
            {isPending &&
              <div className='mobile-sidebar-logout'>
                <img src={logoutImg} alt="logout" />Loading
              </div>
            }
          </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;