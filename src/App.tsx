import React from 'react';

import Header from './components/Header';
import Search from './components/Search';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Header />
      <Search />
    </div>
  );
};

export default App;
