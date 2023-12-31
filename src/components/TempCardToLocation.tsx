import {useState, useEffect} from 'react'
import { ContainerDay, TitleDay } from '../styles/styled'
import WaveBorder from './WaveBorder'
import cloudy from '../pages/images/cloudy.png'
import Zoom from 'react-reveal/Zoom'
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { convertToFahrenheit, getUserLocation } from '../utils/functions'
import loadingGif from './gifs/loading__.gif'
import { fetchWeatherData } from '../apis/weather.api.location'


const TempCardToLocation = () => {
    const [city, setCity] = useState<string>('')
    const [temp, setTemp] = useState<number>()
    const [weather, setWeather] = useState<string>('')
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    const isBoolean = useSelector((state: RootState) => state.example.isBoolean);
      
      useEffect(() => {
        const fetchData = async () => {
            try {
              const location = await getUserLocation();
              setCoordinates(location as { latitude: number; longitude: number });
              setLoading(false);
            } catch (error) {
              console.error('Error:', error);
              setLoading(false);
            }
          };
        fetchData();
      }, []);
    
      useEffect(() => {
        if (!loading && coordinates) {
          const { latitude, longitude } = coordinates;
      
          fetchWeatherData(latitude, longitude)
            .then((weatherData) => {
              if (weatherData) {
                setCity(weatherData.city);
                setWeather(weatherData.weather);
                setTemp(weatherData.temp);
              }
            });
        }
      }, [loading, coordinates]);
      
    
  return (
    <>
    {temp ? 
     <Zoom>
     <ContainerDay
       style={{
         height:"30vh"
       }}
       
       >
         <TitleDay>{city}</TitleDay>
         <WaveBorder upperColor="#001f3f" lowerColor="#DDDDDD" animationNegativeDelay={2} />
         <div
                  style={{
                     display:"flex",
                     alignItems:"center",
                     flexDirection:"column",
                     justifyContent:"center",
                     height:"60%",
                     fontFamily: `'Roboto', sans-serif`,
                     fontWeight:"bold",
                     fontSize:"1.2rem"
                   }}
         >
 <div
 
 style={{
     display:"flex",
     alignItems:"center",
     justifyContent:"space-around",
     height:"60%",
     fontFamily: `'Roboto', sans-serif`,
     fontWeight:"bold",
     width:"100%"
   }}
 >
 {isBoolean && temp !== undefined ? temp + ' °C' : (temp !== undefined ? convertToFahrenheit(temp) : 'Temperature data not available')}
 <div>{weather}</div>
 </div>
  <div
  style={{
     padding:"1rem"
  }}
  >
<img width="50vmin" src={cloudy} />
  </div>
         </div>
       </ContainerDay>
     </Zoom>
     : <img src={loadingGif} width="150vmin"/>
}
    </>
  )
}

export default TempCardToLocation
