const getIcon = (condition: string): string => {
  switch (condition) {
    case 'Clear': {
      return '☀';
    }
    case 'Rain': {
      return '🌧️';
    }
    case 'Thunderstorm': {
      return '⛈️';
    }
    case 'Snow': {
      return '🌨️';
    }
    case 'Drizzle': {
      return '🌨️';
    }
    case 'Clouds': {
      return '☁️';
    }
    case 'Atmosphere': {
      return '🌥️';
    }
    case 'Haze': {
      return '🌫';
    }
    default:
      return '⛅';
  }
};

export default getIcon;
