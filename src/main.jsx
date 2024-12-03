import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WeatherComponent } from './Weather.jsx';
import './index.css';
import ReactLogo from './assets/react.svg';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="w-screen h-screen flex flex-col gap-y-11 justify-center items-center bg-slate-100">
      <img 
        src={ReactLogo} 
        className="animate-spin-slow" 
        alt="React logo" 
        style={{ width: "100px", height: "100px" }} 
      />
      <WeatherComponent /> 
    </div>
  </StrictMode>
);
