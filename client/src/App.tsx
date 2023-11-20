import "@mantine/core/styles.css";
import { MantineProvider, Center, Box } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from './components/HeaderSimple/HeaderSimple';
import { FooterLinks } from './components/FooterLinks/FooterLinks';
import { Home } from './pages/Home/Home';
import { AboutTom } from './pages/AboutTom/AboutTom';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { Admin } from './pages/Admin/Admin';
import { Gallery } from './pages/Gallery/Gallery';
import ScrollToTop from './utils/scrollToTop';
import NewsletterSuccess from './pages/NewsletterSuccess/NewsletterSuccess';
import NewsletterFailure from './pages/NewsletterFailure/NewsletterFailure';
import NewsletterUnsubscribe from './pages/NewsletterUnsubscribe/NewsletterUnsubscribe';
import UnsubscribeSuccess from './pages/UnsubscribeSuccess/UnsubscribeSuccess';
import UnsubscribeFailure from './pages/UnsubscribeFailure/UnsubscribeFailure';

// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFound } from "./pages/NotFound/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/">
        <ScrollToTop />
        <MantineProvider theme={theme}>
          <HeaderSimple />
          <Center style={{ minHeight: '10vh' }}>
            <Box>
              <br />
              <Routes>
              <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/abouttom" element={<AboutTom />} />
                <Route path="/boardofdirectors" />
                <Route path="/events" />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/donate" />
                <Route path="/contact" />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/newsletter-success" element={<NewsletterSuccess />} />
                <Route path="/newsletter-failure" element={<NewsletterFailure />} />
                <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
                <Route path="/unsubscribe-success" element={<UnsubscribeSuccess />} />
                <Route path="/unsubscribe-failure" element={<UnsubscribeFailure />} />
              </Routes>
            </Box>
          </Center>

          <FooterLinks />
        </MantineProvider>;
      </Router>
    </QueryClientProvider>
  )
}