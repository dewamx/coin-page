import { Link } from 'react-router';

const CoinCard = ({ coin, isFavorite, onToggleFavorite }) => {
  return (
    <div className='coin-card-wrapper'>
      <Link to={`/coin/${coin.id}`}>
        <div className='coin-card'>
          <div className='coin-header'>
            <img src={coin.image} alt={coin.name} className='coin-image' />
            <div>
              <h2>{coin.name}</h2>
              <p className='symbol'>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <p>Price: ${coin.current_price.toLocaleString()}</p>
          {coin.price_change_percentage_24h == null ? (
            <p>24h change: N/A</p>
          ) : (
            <p
              className={
                coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)} %
            </p>
          )}
          <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
        </div>
      </Link>
      <button
        type='button'
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(coin.id)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${coin.name} from favorites`
            : `Add ${coin.name} to favorites`
        }
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
};

export default CoinCard;
