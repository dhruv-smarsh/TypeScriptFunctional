import React from 'react'
import AppRouting from "../AppRouting";
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import { NavLink } from 'react-router-dom';

const routes = [
    {
      path: "/",
      name: "DashBoard",
      pathname: "dashBoard",
      icon: <HomeIcon/>
    },
    {
        path: "/analytics",
        name: "Messages",
        pathname: "analytics",
        icon: <TimelineIcon/>
    },
    {
        path: "/",
        name: "Orders",
        pathname: "dashBoard",
        icon: <HomeIcon/>
    },
    {
        path: "/",
        name: "News",
        pathname: "dashBoard",
        icon: <HomeIcon/>
    },
    {
        path: "/",
        name: "data",
        pathname: "dashBoard",
        icon: <HomeIcon/>
    },
];

export default function SideMenu()  {
  return (
      <>
        <div className={`main-container`}>
          <div className={`sideBar`} style={{width: '200px'}}>
              <section className={`routes`}>
                  {routes.map((element: any) => {
                      return <NavLink className={`link ${window.location.pathname === element.path ? `active` : ''}`}  to={element.pathname} key={element.name}>
                          <div>{element.icon}</div>
                          <div>{element.name}</div>
                      </NavLink>
                  })}
                  {/*{routes.map((element: any) => <a className={`link`} href={element.pathname} key={element.name} >*/}
                  {/*    <div className={`icon`}>{element.icon}</div>*/}
                  {/*    <div className={`icon`}>{element.name}</div>*/}
                  {/*</a>)}*/}
              </section>
          </div>
            <div className={`mt-10`}>
                <AppRouting/>
            </div>
        </div>
      </>
  )
}
