import React from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Project from './components/Projects';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <main>
      <Home />
      <Header />
      <About />
      <Project />
      <Contact />
      <Footer />
    </main>
  )
}

export default App;