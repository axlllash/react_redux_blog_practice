import React from 'react';
import Header from './views/header';
import Content from './views/content';
import Footer from './views/footer';

export default function shell(){
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}