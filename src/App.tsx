import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './styles/main.scss';
import { Navbar } from './components/Navbar';
import { ProvideAuth } from './hooks/useAuth';

const Dashboard = React.lazy(async () => ({
  default: (await import('./components/Dashboard')).Dashboard,
}));

const EnterEmail = React.lazy(async () => ({
  default: (await import('./components/EnterEmail')).EnterEmail,
}));

const App = () => {
  return (
    <div className={styles.container}>
      <ProvideAuth>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<EnterEmail />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Suspense>
      </ProvideAuth>
    </div>
  );
};

export default App;
