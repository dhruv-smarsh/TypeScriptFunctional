import React from 'react';
import './App.css';
import AppRouting from "./AppRouting";
import SideMenu from "./component/SideMenu";
import {BrowserRouter as Router} from 'react-router-dom'
import SideMenu1 from "./component/SideMenu1";
import SideMenu2 from "./component/SideMenu2";

function App() {
  return (
      <>
          <Router>
              {/*<SideMenu/>*/}
              {/*<SideMenu2/>*/}
              <SideMenu1/>
          </Router>
      </>
  );
}

export default App;
