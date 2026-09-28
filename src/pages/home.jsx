import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import Spinner from '../components/Spinner';
import FavoritesToggle from '../components/FavoritesToggle';
import { useCoins } from '../context/useCoins';

const HomePage = () => {
  const {
    coins: filteredCoins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    loading,
    error,
    favorites,
    toggleFavorite,
    isFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  } = useCoins();

  const hiddenFavorites = showFavoritesOnly
    ? favorites.length - filteredCoins.length
    : 0;

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <Spinner color='white' />}
      {error && <div className='error'>{error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <FavoritesToggle
          checked={showFavoritesOnly}
          onChange={setShowFavoritesOnly}
        />
      </div>

      {!loading && !error && hiddenFavorites > 0 && !filter && (
        <p className='favorites-note'>
          {hiddenFavorites} favorite{hiddenFavorites > 1 ? 's' : ''} not in the
          current list. Increase the limit to see them.
        </p>
      )}

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isFavorite={isFavorite(coin.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : showFavoritesOnly && favorites.length === 0 ? (
            <p>No favorites yet. Star a coin to add it.</p>
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
