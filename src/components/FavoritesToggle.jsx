const FavoritesToggle = ({ checked, onChange }) => {
  return (
    <label className='favorites-toggle'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      Favorites only
    </label>
  );
};

export default FavoritesToggle;
