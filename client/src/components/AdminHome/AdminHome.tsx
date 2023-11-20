import React from 'react';

type AdminHomeProps = {
  username: string;
}

const AdminHome: React.FC<AdminHomeProps> = ({ username }): React.ReactElement => {
  return (
    <h4>Welcome <span>{username}</span></h4>
  );
};

export default AdminHome;