import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import classes from './AdminNav.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string; isLogout?: boolean }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);
  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };
  const items = (links || []).map((link) => {
    if (link.isLogout) {
      // Render a button for logout
      return (
        <button key={link.label} onClick={Logout} className={classes.link}>
          {link.label}
        </button>
      );
    } else {
      // Render a regular link
      return (
        <Link to={link.link} key={link.label} className={classes.link}>
          {link.label}
        </Link>
      );
    }
  });
  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const navigationLinks = {
  label: 'Admin Page',
  icon: IconCalendarStats,
  links: [
    { label: 'Home', link: '/admin' },
    { label: 'Newsletter', link: '/admin/newsletter' },
    {label: 'Logout', link:'/logout', isLogout: true }
  ],
};

export function AdminNav() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...navigationLinks} />
    </Box>
  );
}





// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Group } from '@mantine/core';
// import { useCookies } from "react-cookie";

// import classes from './AdminNav.module.css';

// const data = [
//   { link: '/admin', label: 'Home' },
//   { link: '/admin/newsletter', label: 'Newsletter' },
// ];


// export function AdminNav() {
//   const navigate = useNavigate();
//   const [active, setActive] = useState('Billing');
//   const [, , removeCookie] = useCookies(['token']);
//   const links = data.map((item) => (
//     <Link
//       to={item.link}
//       className={classes.link}
//       data-active={item.label === active || undefined}
//       key={item.label}
//       onClick={() => {setActive(item.label)}}
//     >
//       <span>{item.label}</span>
//     </Link>
//   ));

//   const Logout = () => {
//     removeCookie("token", { path: "/" });
//     navigate("/login");
//   };

//   return (
//     <nav className={classes.navbar}>
//       <div className={classes.navbarMain}>
//         <Group className={classes.header} >
//           <h4 className={classes.headerTitle}>Admin Page</h4>
//         </Group>
//         {links}
//       </div>

//       <div className={classes.footer}>
//         <a href="#" className={classes.link} onClick={Logout}>
//           <span>Logout</span>
//         </a> 
//       </div>
//     </nav>
//   );
// }