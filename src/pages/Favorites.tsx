import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerFiveDays,ContentDay, ContainerDay, TitleDay } from '../styles/styled';
import WaveBorder from '../components/WaveBorder';
import sunny from './images/sunny.png'
import winter from './images/winter.png'
import cloudy from './images/cloudy.png'
import {convertToFahrenheit} from '../utils/functions'
import {TbTemperatureFahrenheit, TbTemperatureCelsius} from 'react-icons/tb'
import {MdDeleteSweep} from 'react-icons/md'
import { BottomLeftButton } from '../styles/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateData } from '../utils/store';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

interface CityData {
  name: string;
  temperature: string;
  weatherCondition: string;
}

const Favorites = () => {
  const [favoritesData, setFavoritesData] = useState<{ cityKey: string; cityData: CityData }[]>([]);
  const [convertButton, setConvertButton] = useState<boolean>(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();


    const clearLocalStorage = () => {
    localStorage.clear();
    setFavoritesData([]);
  };

  useEffect(() => {
    const favorites: { cityKey: string; cityData: CityData }[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoritesData(favorites);
    console.log('Favorites:', favorites);
  }, []);


  const handleUpdate = (cityKey : string, name:string, temp:string) => {
    navigate('/home');
    dispatch(updateData([cityKey, name, temp]));
  };

  return (
    <ContainerFiveDays
style={{
  padding:"3rem"
}}>

  {favoritesData.length !== 0 && 
<BottomLeftButton
      style={{
        bottom:"150px"
      }}
      onClick={() => clearLocalStorage()}>
        <MdDeleteSweep/>
      </BottomLeftButton>
      }
   {favoritesData.length !== 0 &&  <BottomLeftButton onClick={() => setConvertButton(!convertButton)}>
        {convertButton ? <TbTemperatureFahrenheit/> : <TbTemperatureCelsius/>}
        </BottomLeftButton>}
      {favoritesData.map((favorite, index) => (
<Zoom>
<ContainerDay 
        onClick={() => handleUpdate(favorite.cityKey, favorite.cityData.name, favorite.cityData.temperature)}
        style={{
          height:"30vh"
        }}
        key={index}>
          <TitleDay>{favorite.cityData.name}</TitleDay>
          <WaveBorder upperColor="#001f3f" lowerColor="#DDDDDD" animationNegativeDelay={2} />
          <ContentDay>
            <div>
         {convertButton ? favorite.cityData.temperature : convertToFahrenheit(parseFloat(favorite.cityData.temperature))}

            </div>
            <div>

        {favorite.cityData.weatherCondition}
            </div>

          </ContentDay>
          <div
          style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}
          >
       {parseFloat(favorite.cityData.temperature) > 25 && <img width="50vmin" src={sunny} />}
       {parseFloat(favorite.cityData.temperature) > 15 && parseFloat(favorite.cityData.temperature) < 25 && (<img width="50vmin" src={cloudy} />)}
       {parseFloat(favorite.cityData.temperature) < 15 && <img width="50vmin" src={winter} />}
          </div>
        </ContainerDay>
</Zoom>
      ))}
    </ContainerFiveDays>
  );
};

export default Favorites;


