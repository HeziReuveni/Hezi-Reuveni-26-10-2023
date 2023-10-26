
export const  getDayOfWeek = (dateString: string): string => {
    const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date: Date = new Date(dateString);
    return daysOfWeek[date.getUTCDay()];
  }

export const getAverageTempForDay = (max:number, min: number) => {
    let result = 0
    result =  max - min
    return result + ' °C'
}


export const celsiusToFahrenheit = (max: number, min: number): string => {
  const tempCelsius = max - min; 
  const tempFahrenheit = (tempCelsius * 9) / 5 + 32; 
  const fahrenheitString = tempFahrenheit.toFixed(2); 
  const formattedFahrenheit = fahrenheitString.replace(/\.?0+$/, '');

  return formattedFahrenheit + '°F'; 
};


export const convertToFahrenheit = (celsius: number): string => {
  const fahrenheit = (celsius * 9) / 5 + 32;
  const fahrenheitString = fahrenheit.toFixed(2); 
  const formattedFahrenheit = fahrenheitString.replace(/\.?0+$/, '');
  return formattedFahrenheit + '°F'; 
};


export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          reject(error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
      reject(new Error('Geolocation is not available'));
    }
  });
};
