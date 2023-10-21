import { useState } from 'react';
import { Container, Group, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import logoImage from '../../images/logo.png';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/home', label: 'Home' },
  { link: '/aboutus', label: 'About Us' },
  { link: '/abouttom', label: 'About Tom' },
  { link: '/boardofdirectors', label: 'Board of Directors' },
  { link: '/events', label: 'Events' },
  { link: '/gallery', label: 'Gallery' },
  { link: '/donate', label: 'Donate' },
  { link: '/contact', label: 'Contact' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Image src={logoImage} alt="logo" w="180" fit="contain" />
        <div className={classes.spacer} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Image src={logoImage} alt="logo" width={200} height={200} />

      </Container>
    </header>
  );
}