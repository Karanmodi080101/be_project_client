import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SessionStorageKeywords } from '../shared/constants/global-constant';
import Login from '../modules/authentication/login';
import Register from '../modules/authentication/register';
import Landing from '../modules/landing/landing';
import Sidebar from './sidebar';
import SidebarAdmin from './sidebar-admin';

const Layout = (props) => {
  let currentUser = sessionStorage?.getItem(
    SessionStorageKeywords?.currentUser
  );
  if (currentUser) {
    currentUser = JSON.parse(currentUser);
  }

  return (
    <Router>
      <Fragment>
        <div>
          {/* <Header /> */}
          {JSON.parse(
            sessionStorage?.getItem(SessionStorageKeywords?.currentUser)
          )?.isAdmin ? (
            <SidebarAdmin />
          ) : (
            <Sidebar />
          )}
        </div>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <div className='content-wrapper'>{props.children}</div>
      </Fragment>
    </Router>
  );
};

export default Layout;
