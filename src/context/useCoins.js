import { useContext } from 'react';
import { CoinsContext } from './CoinsContext';

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) throw new Error('useCoins must be used within a CoinsProvider');
  return context;
};
