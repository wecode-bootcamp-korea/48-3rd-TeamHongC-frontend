import React from 'react';
import Aside from '../Aside/Aside';

export default function Layout({ children }) {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <Aside></Aside>
      {children}
    </div>
  );
}
