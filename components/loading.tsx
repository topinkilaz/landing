import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <CircularProgress 
          size={60}
          thickness={4}
          sx={{ color: '#5e2129' }} 
        />
        {/* <p className="text-white mt-4 text-xl font-medium">Cargando...</p> */}
      </div>
    </div>
  );
};

export default Loading;