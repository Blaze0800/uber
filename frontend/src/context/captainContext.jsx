import { createContext, useState, useContext } from 'react';


export const CaptainDataContext = createContext();


// export const useCaptain = () => {
//   const context = useContext(CaptainDataContext);
//   if (!context) {
//     throw new Error('useCaptainData must be used within a CaptainDataProvider');
//   }
//   return context;
// };


export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isloading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptian(captainData);
  };
  

  const value = {
    captain,
    setCaptain,
    isloading,
    setisLoading,
    error,
    setError,
    updateCaptain
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
