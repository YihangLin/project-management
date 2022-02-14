import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import home from '../assets/home.svg';
import tasks from '../assets/tasks.svg';
import notifications from '../assets/notifications.svg';
import logout from '../assets/logout.svg';
import design from '../assets/design.svg';
import development from '../assets/development.svg';
import marketing from '../assets/marketing.svg';
import completed from '../assets/completed.svg';

import '../scss/Navbar.scss';
import { useState } from 'react';

const Navbar = () => {
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);

  return (
    <nav>
      <div className='container navbar'>
        <div className='logo'>
          <img src={logo} alt="logo" />
        </div>
        
        <div className='desktop-user'>
          <img src={notifications} alt="notifications" />
          <span>Name</span>
          <div className='profile'>

          </div>
          <div className='desktop-logout'>
            <img src={logout} alt="logout" /><span>Logout</span>
          </div>
        </div>

        <div className='menu' onClick={() => setMobileSidebar(prev => !prev)}>
          <img src={menu} alt="menu" />
        </div>

        <div className={`mobile-sidebar ${mobileSidebar ? 'disable-mobile-sidebar' : ''}`}>
          <div className='mobile-sidebar-user'>
            <div className='profile'>

            </div>
            <span>Name</span>
          </div>

          <div className='mobile-sidebar-links'>
            <p>Dashboard:</p>
            <ul>
              <li><a href="#"><img src={home} alt="home" /> Home</a></li>
              <li><a href="#"><img src={tasks} alt="tasks" /> My Tasks</a></li>
              <li><a href="#"><img src={completed} alt="completed" /> Completed</a></li>
              <li className='mobile-notification' ><a href="#"><img src={notifications} alt="notifications" /> Notifications</a></li>
            </ul>
          </div>

          <div className='mobile-sidebar-categories'>
            <p>Categories:</p>
            <ul>
              <li><a href="#"><img src={development} alt="development" /> Develeopment</a></li>
              <li><a href="#"><img src={design} alt="design" />Design</a></li>
              <li><a href="#"><img src={marketing} alt="marketing" />Marketing</a></li>
            </ul>
          </div>

          <div className='mobile-sidebar-logout'>
            <img src={logout} alt="logout" />Logout
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;