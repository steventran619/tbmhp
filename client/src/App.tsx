import "@mantine/core/styles.css";
import { MantineProvider, Text, Center, Box } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from './components/HeaderSimple/HeaderSimple';
import { FooterLinks } from './components/FooterLinks/FooterLinks';

export default function App() {
  return <MantineProvider theme={theme}>
    <HeaderSimple />

    <Center style={{ minHeight: '10vh' }}>
      <Box>
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'lime', to: 'rgba(97, 43, 43, 1)', deg: 0 }}
        >
          Welcome to the TBMHP Application
        </Text>
        <br />
        <Text>Built with in React (TSX) + Mantine</Text>
        <Text>Built with in React (TSX) + Mantine</Text>

        <Text>Built with in React (TSX) + Mantine</Text>

      </Box>
    </Center>

    <FooterLinks />
  </MantineProvider>;
}
