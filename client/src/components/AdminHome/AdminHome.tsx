import React from 'react';
import classes from './AdminHome.module.css';

type AdminHomeProps = {
  username: string;
}

const AdminHome: React.FC<AdminHomeProps> = ({ username }): React.ReactElement => {
  return (
    <h4 className={classes.homeText}>Welcome <span>{username}</span></h4>
  );
};

export default AdminHome;