import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your main App component
import LoadingSpinner from './components/StyledComponents/LoadingSpinner';


const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);
appRoot.render(<LoadingSpinner isLoading={true} />);
appRoot.render(<App />);

