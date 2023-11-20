import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { useCookies } from "react-cookie";

import classes from './AdminNav.module.css';

const data = [
  { link: '/admin', label: 'Home' },
  { link: '/admin/newsletter', label: 'Newsletter' },
];

export function AdminNav() {
  const navigate = useNavigate();
  const [active, setActive] = useState('Billing');
  const [, , removeCookie] = useCookies(['token']);
  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={() => {setActive(item.label)}}
    >
      <span>{item.label}</span>
    </Link>
  ));

  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} >
          <h4 className={classes.headerTitle}>Admin Page</h4>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={Logout}>
          <span>Logout</span>
        </a> 
      </div>
    </nav>
  );
}