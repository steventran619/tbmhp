import { Title, Text, Container, Group, Button } from '@mantine/core';
import classes from './NotFound.module.css';
import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Whoa you found a secret place!</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Button onClick={() => navigate('/')} variant="subtle" color="rgba(9, 99, 51, 1)" size="md" radius="xl">Take Me Home!</Button>
      </Group>
    </Container>
  );
}