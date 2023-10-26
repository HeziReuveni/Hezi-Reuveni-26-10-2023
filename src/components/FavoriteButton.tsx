import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { AiFillHeart } from 'react-icons/ai';
import { ContainerFavoriteButton } from '../styles/styled';

interface CityData {
  name: string;
  temperature: string;
  weatherCondition: string;
}

const FavoriteButton: React.FC<{ cityKey: string; cityData: CityData }> = ({
  cityKey,
  cityData,
}) => {
  const [favoriteItem, setFavoriteItem] = useState(false);

  // Function to add or remove a city from favorites
  const handleToggleFavorite = () => {
    const favoriteCity = {
      cityKey,
      cityData,
    };

    const existingFavoritesString = localStorage.getItem('favorites');
    const existingFavorites = existingFavoritesString
      ? JSON.parse(existingFavoritesString)
      : [];

    const isDuplicate = existingFavorites.some(
      (item: { cityKey: string }) => item.cityKey === cityKey
    );

    if (isDuplicate) {
      // Remove the city from favorites
      const updatedFavorites = existingFavorites.filter(
        (item: { cityKey: string }) => item.cityKey !== cityKey
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add the city to favorites
      existingFavorites.push(favoriteCity);
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
    }

    // Toggle the favorite status
    setFavoriteItem(!isDuplicate);
  };

  return (
    <ContainerFavoriteButton
    style={{
      marginLeft:"1rem"
    }}
    >
      <Typography variant="caption" style={{ display: 'inline' }}>
        <Button
          onClick={handleToggleFavorite}
          style={{
            textTransform: 'none',
          }}
          variant="contained"
          size="small"
        >
          {favoriteItem ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Typography>
      <AiFillHeart
        style={{
          color: favoriteItem ? 'red' : 'rgba(80, 80, 80, 0.5)',
          transform: 'translateY(-2px)',
          marginTop: '1rem',
        }}
        size={30}
        color="rgba(80, 80, 80, 0.5)"
      />
    </ContainerFavoriteButton>
  );
};

export default FavoriteButton;
