import { Text, Container, Image, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import logoImage from '../../images/logo.png';
import classes from './FooterLinks.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'About',
    links: [
      { label: 'About Us', link: '/aboutus' },
      { label: 'Board of Directors', link: '/boardofdirectors' },
      { label: 'Contact', link: '/contact' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Events', link: '/events' },
      { label: 'Gallery', link: '/gallery' },
      { label: 'Donate', link: 'https://www.paypal.com/donate/?hosted_button_id=9G79KGUBH7RUW' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Facebook', link: 'https://www.facebook.com/people/Thomas-Batterman-Mental-Health-Project/100094105658144/' },
      { label: 'Instagram', link: 'https://www.instagram.com/tb.mhp/' },
    ],
  },
];

export function FooterLinks() {
  const [newsletterValue, setNewsletterValue] = useState<{
    email: string;
    firstname: string;
    lastname: string;
  }>({
    email: "",
    firstname: "",
    lastname: "",
  })
  const { email, firstname, lastname } = newsletterValue;
  const groups = data.map((group) => {
    const links = group.links.map((link) => (
      <Link
      key={link.label}
      to={link.link}
      className={`${classes.link}`}    >
      {link.label}
    </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleError = (err: string) => {
    console.log(err);
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: "bottom-left",
    });
  };

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/newsletter/signup`,
        {
          ...newsletterValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred while submitting the form. Please try again.");
      console.log(error);
    }
    setNewsletterValue({
      ...newsletterValue,
      email: "",
      firstname: "",
      lastname: "",
    });
  };

  // Add the form as another group within the groups container
  groups.push(
    <div className={classes.wrapper} key="newsletter">
      <form onSubmit={handleNewsletterSubmit} className={classes.form}>
        <Text className={classes.title}>Subscribe to our newsletter</Text>
        <div className={classes.formField}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formField}>
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="First Name"
            onChange={handleOnChange}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formField}>
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Last Name"
            onChange={handleOnChange}
            className={classes.input}
            required
          />
        </div>
        <button type="submit" className={classes.submitButton}>Subscribe</button>
      </form>
    </div>
  );

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
      <ToastContainer />
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2023 TBMHP Fall CS467 Developers. All rights reserved.
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