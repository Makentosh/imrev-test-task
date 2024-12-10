import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import Interceptor from './components/Interceptor.ts';
import { App, AuthProvider } from './components';

const element: HTMLElement = document.getElementById('root')!;
const root = createRoot(element);

root.render(
    <StrictMode>
      <BrowserRouter>
        <Interceptor>
          <AuthProvider>
            <App/>
          </AuthProvider>
        </Interceptor>
      </BrowserRouter>
    </StrictMode>,
);
