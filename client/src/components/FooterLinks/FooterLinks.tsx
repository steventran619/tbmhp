import { Text, Container, Image, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import logoImage from '../../images/logo.png';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'About Us', link: '#' },
      { label: 'About Tom', link: '#' },
      { label: 'Board of Directors', link: '#' },
      { label: 'Contact', link: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Events', link: '#' },
      { label: 'Gallery', link: '#' },
      { label: 'Donate', link: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Facebook', link: 'https://www.facebook.com/people/Thomas-Batterman-Mental-Health-Project/100094105658144/' },
      { label: 'Instagram', link: 'https://www.instagram.com/tb.mhp/' },
      { label: 'Subscribe Newsletter', link: '#' },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image src={logoImage} alt="logo" w="180" fit="contain" />

          <Text size="xs" c="dimmed" className={classes.description}>
            A Path to Wellness
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2023 TBMHP Fall C467 Developers. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <a href="https://www.facebook.com/people/Thomas-Batterman-Mental-Health-Project/100094105658144/" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandFacebook style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://www.instagram.com/tb.mhp/" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </footer >
  );
}