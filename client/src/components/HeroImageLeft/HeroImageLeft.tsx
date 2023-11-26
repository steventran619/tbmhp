import { Image, Container, Title, Button, Group, Text, Stack, Anchor } from '@mantine/core';
import { IconBrandPaypal } from '@tabler/icons-react';
import classes from './HeroImageLeft.module.css';

export function HeroImageLeft() {
  return (
    <Container fluid>
      <div className={classes.inner}>
        <Image src="https://res.cloudinary.com/dews5utjs/image/upload/v1701029407/tbmhp_board/Driveway-2-scaled_hlp33l.jpg" className={classes.image} radius="sm" alt="driveway toward forest with flowers"/>
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
            <Text fw={500} style={{ textAlign: 'justify' }}>
              The mission of TBMHP is to provide funding for mental health services for low-income individuals and their families, either directly or through collaboration with other non-profit organizations. Provide academic scholarships for higher education to students pursuing careers in mental health or related fields. Provide research grants to accredited institutions for the purpose of mental health research including but not limited to medicinal research and clinical trials. Raise awareness about mental health care, research, services, support, educational resources, and public policy, especially as related to the needs of low-income individuals and their families. Advocate at the local, state, and/or national level in support of policies to improve the lives of individuals with mental health issues and their families.
            </Text>
          </Stack>
          <Group mt={30}>
            <Button variant="filled" radius="xl" size="md" color="rgba(9, 99, 51, 1)" className={classes.control} >
              <Anchor href="https://www.paypal.com/donate/?hosted_button_id=9G79KGUBH7RUW" target="_blank" underline="never" c='white'>
                {<IconBrandPaypal size={14} />} DONATE
              </Anchor>

            </Button>
          </Group>
        </div>

      </div>
    </Container>
  );
}