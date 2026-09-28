import { useState, useEffect, useMemo } from 'react';
import { CoinsContext } from './CoinsContext';
const API_URL = import.meta.env.VITE_COINS_API_URL;
const FAVORITES_KEY = 'favorites';

const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Storage unavailable (e.g. private mode); favorites stay in memory
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  const filteredCoins = useMemo(
    () =>
      coins
        .filter((coin) => !showFavoritesOnly || favorites.includes(coin.id))
        .filter((coin) => {
          return (
            coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(filter.toLowerCase())
          );
        })
        .sort((a, b) => {
          switch (sortBy) {
            case 'market_cap_desc':
              return b.market_cap - a.market_cap;
            case 'market_cap_asc':
              return a.market_cap - b.market_cap;
            case 'price_desc':
              return b.current_price - a.current_price;
            case 'price_asc':
              return a.current_price - b.current_price;
            case 'change_desc':
              return (
                b.price_change_percentage_24h - a.price_change_percentage_24h
              );
            case 'change_asc':
              return (
                a.price_change_percentage_24h - b.price_change_percentage_24h
              );
          }
        }),
    [coins, filter, sortBy, showFavoritesOnly, favorites]
  );

  return (
    <CoinsContext.Provider
      value={{
        coins: filteredCoins,
        loading,
        error,
        filter,
        setFilter,
        limit,
        setLimit,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        isFavorite,
        showFavoritesOnly,
        setShowFavoritesOnly,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export default CoinsProvider;
