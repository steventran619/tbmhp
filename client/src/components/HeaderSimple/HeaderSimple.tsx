import { useState, useEffect } from 'react';
import { Container, Group, Burger, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logoImage from '../../images/logo.png';
import classes from './HeaderSimple.module.css';
import { Link, useLocation } from "react-router-dom";
import { DarkMode } from '../DarkMode/DarkMode';

const links = [
  { link: '/', label: 'Home' },
  { link: '/aboutus', label: 'About Us' },
  { link: '/boardofdirectors', label: 'Board of Directors' },
  { link: '/events', label: 'Events' },
  { link: '/gallery', label: 'Gallery' },
  { link: 'https://www.paypal.com/donate/?hosted_button_id=9G79KGUBH7RUW', label: 'Donate' },
  { link: '/contact', label: 'Contact' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const location = useLocation();

  // Update the active state based on the current location pathname
  useEffect(() => {
    const currentPath = location.pathname;
    setActive(currentPath);
  }, [location.pathname]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={`${classes.link} ${active === link.link ? "active" : ""}`}
      data-active={active === link.link || undefined} // used to highlight the active link
      onClick={() => toggle()}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Link to={'/'}>
          <img src={logoImage} alt="tbmhp logo" width="180"/>
        </Link>
        <div className={classes.spacer} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <DarkMode />
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
      { opened && (
          <Stack className={classes.mobileMenu} hiddenFrom="xs">
            {items}
          </Stack>
          )}
      
    </header>
  );
}