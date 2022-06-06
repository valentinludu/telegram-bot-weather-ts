import type { weatherResponse } from './types';
import getIcon from './getIcon';

const getText = (info: weatherResponse): string => {
  return (
    getIcon(info.weather[0].main) +
    '' +
    'Current temperature in ' +
    info.name +
    ' is ' +
    info.main.temp +
    '°C with wind speed of ' +
    info.wind.speed +
    ' and humidity level is of ' +
    info.main.humidity +
    ' .'
  );
};

export default getText;
