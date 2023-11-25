import { Title, Text, Container, Overlay, Space } from '@mantine/core';
import classes from './HeroImageBackground.module.css';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />
      <div className={classes.inner}>
      <Space h="xl" />
        <Title className={classes.title}>
          This was Tom
        </Title>
        <Container size={1280}>
          <Text fw={600} size="xl" className={classes.description}>
          The Thomas Batterman Mental Health Project is named after Thomas Batterman, or Tom as his friends and family knew him. After a decades-long struggle with depression and substance abuse, Tom died by suicide in 2022. In his loving memory, Tom&#39;s wife and children established the Thomas Batterman Mental Health Project (TBMHP) with the goal of helping individuals facing similar challenges as those Tom and his family endured.
          </Text>
        </Container>
      </div>
    </div>
  );
}