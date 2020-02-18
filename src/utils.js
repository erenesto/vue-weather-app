/* eslint-disable import/prefer-default-export */
const weatherImages = {
  clear: {
    image: {
      night: 'clear.jpg',
      day: 'sunny.jpg',
    },
  },
  partlyCloudy: {
    image: {
      night: 'partly-cloud-night.jpg',
      day: 'partly-cloudy-day.jpg',
    },
  },
  cloudy: {
    image: {
      night: 'cloudy-night.jpg',
      day: 'cloudy-day.jpg',
    },
  },
  lightRain: {
    image: {
      night: 'light-rain-night.jpg',
      day: 'light-rain-day.jpg',
    },
  },
  heavyRain: {
    image: {
      night: 'heavy-rain-night.jpg',
      day: 'heavy-rain-day.jpg',
    },
  },
  thunder: {
    image: {
      night: 'thunder-night.jpg',
      day: 'thunder-day.jpg',
    },
  },
  mist: {
    image: {
      night: 'fog-night.jpg',
      day: 'fog-day.jpg',
    },
  },
  squall: {
    image: {
      night: 'squall.jpg',
      day: 'squall.jpg',
    },
  },
  tornado: {
    image: {
      night: 'tornado.jpg',
      day: 'tornado.jpg',
    },
  },
  lightSnow: {
    image: {
      night: 'snow-light.jpg',
      day: 'snow-light.jpg',
    },
  },
  snow: {
    image: {
      night: 'snow.jpg',
      day: 'snow.jpg',
    },
  },
};

const createWeaterForCode = async (code) => {
  let type = '';

  if (code >= 200 && code < 300) {
    type = 'thunder';
  } else if (code >= 300 && code <= 501) {
    type = 'lightRain';
  } else if (code >= 502 && code < 600) {
    type = 'heavyRain';
  } else if (code >= 600 && code <= 620) {
    type = 'lightSnow';
  } else if (code > 620 && code < 700) {
    type = 'snow';
  } else if (code > 700 && code < 770) {
    type = 'mist';
  } else if (code === 771) {
    type = 'squall';
  } else if (code === 781) {
    type = 'tornado';
  } else if (code === 800) {
    type = 'clear';
  } else if (code > 800 && code < 810) {
    type = 'cloudy';
  }

  return type;
};

export async function fetchBackgroundImage(code, isDayTime) {
  const getType = await createWeaterForCode(code);

  const weatherKeys = Object.keys(weatherImages);
  let imgSrc = '';

  weatherKeys.forEach((key) => {
    if (getType === key) {
      if (isDayTime) {
        imgSrc = weatherImages[key].image.day;
      } else {
        imgSrc = weatherImages[key].image.night;
      }
    }
  });
  return imgSrc;
}
