
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LoadingScreen from './components/LoadingScreen.tsx';
import { AuthProvider } from './context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out',
});

// Re-initialize AOS on window resize
window.addEventListener('resize', () => {
  AOS.refresh();
});

const AppWithLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // You can add additional loading logic if needed
    const loadData = async () => {
      // Simulate loading data
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    loadData();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      )}
    </>
  );
};

createRoot(document.getElementById("root")!).render(<AppWithLoading />);
