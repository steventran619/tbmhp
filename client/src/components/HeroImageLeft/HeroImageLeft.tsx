import { Image, Container, Title, Button, Group, Text, Stack } from '@mantine/core';
import { IconBrandPaypal } from '@tabler/icons-react';
import classes from './HeroImageLeft.module.css';

export function HeroImageLeft() {
  return (
    <Container fluid>
      <div className={classes.inner}>
      <Image src="https://tbmhp.org/wp-content/uploads/2023/05/Driveway-2-scaled.jpg" className={classes.image} radius="sm"/>
        <div className={classes.content}>
          <Title className={classes.title}>
            <i>A PATH TO WELLNESS</i>
          </Title>
          <Text fw={500} mt="md">
          Join the fight against mental illness. With your help, we can change the perception and promote wellness.
          </Text>
          <Stack>
          <Title order={2}>
          Our Mission
          </Title>
          <Text fw={500}>
          The mission of TBMHP is to provide funding for mental health services for low-income individuals and their families, either directly or through collaboration with other non-profit organizations. Provide academic scholarships for higher education to students pursuing careers in mental health or related fields. Provide research grants to accredited institutions for the purpose of mental health research including but not limited to medicinal research and clinical trials. Raise awareness about mental health care, research, services, support, educational resources, and public policy, especially as related to the needs of low-income individuals and their families. Advocate at the local, state, and/or national level in support of policies to improve the lives of individuals with mental health issues and their families.
          </Text>
          </Stack>
          <Group mt={30}>
            <Button component="a" href="https://www.paypal.com/donate/?hosted_button_id=9G79KGUBH7RUW" radius="xl" size="md" color="rgba(9, 99, 51, 1)" leftSection={<IconBrandPaypal size={14} />}className={classes.control} >
              DONATE
            </Button>
          </Group>
        </div>
        
      </div>
    </Container>
  );
}