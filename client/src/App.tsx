import "@mantine/core/styles.css";
import { MantineProvider, Title, Text, Center, Box } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from './components/HeaderSimple/HeaderSimple';
import { FooterLinks } from './components/FooterLinks/FooterLinks';
import { Home } from './pages/Home/Home';
import { AboutTom } from './pages/AboutTom/AboutTom';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { Admin } from './pages/Admin/Admin';
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router basename="/tbmhp">

      <MantineProvider theme={theme}>
        <HeaderSimple />
        <Center style={{ minHeight: '10vh' }}>
          <Box>
            <Title>
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: 'lime', to: 'rgba(97, 43, 43, 1)', deg: 0 }}>
                Thomas Batterman Mental Health Project
              </Text>
            </Title>

            <br />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/abouttom" element={<AboutTom />} />
              <Route path="/boardofdirectors" />
              <Route path="/events" />
              <Route path="/gallery"/>
              <Route path="/donate" />
              <Route path="/contact" />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Box>
        </Center>

        <FooterLinks />
      </MantineProvider>;
    </Router>
  )
}