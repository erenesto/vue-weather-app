<template>
  <div class="main-container container-fluid text-center">
    <div
      v-if="backgroundImg"
      class="bg-image"
      :style="{ backgroundImage: `url(${require(`./assets/images/${backgroundImg}`)})` }"
    ></div>

    <div class="weather__container">
      <WeatherBoxVue
        :weatherData="weather"
        :time="cityLocalTimeFormatted"
        @searchForCity="handleSearch"
        :loading="loading"
        :bg="backgroundImg"
      />
      <WeatherForecastVue :threeHoursStream="threeHoursStream" :loading="loading" />
      <LoadingVue v-if="loading" :error="error" />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import tz from 'moment-timezone';
import shortid from 'shortid';
import tzlookup from 'tz-lookup';
import { weatherApiInstance, geoApiInstance } from './api';
import { fetchBackgroundImage } from './utils';
import WeatherBoxVue from './components/WeatherBox.vue';
import WeatherForecastVue from './components/WeatherForecast.vue';
import LoadingVue from './components/Loading.vue';
import './assets/styles/App.scss';

export default {
  name: 'App',
  components: {
    WeatherBoxVue,
    WeatherForecastVue,
    // eslint-disable-next-line vue/no-unused-components
    LoadingVue,
  },
  data() {
    return {
      weather: '',
      lat: null,
      lon: null,
      code: null,
      backgroundImg: '',
      query: '',
      threeHoursStream: [],
      cityLocalTime: '',
      cityLocalTimeFormatted: '',
      timezoneLookup: '',
      loading: true,
      error: false,
    };
  },
  computed: {
    isDayTime() {
      const hour = moment(this.cityLocalTime).format('H');

      return moment(hour).isBetween(
        moment({ hour: 7, minute: 0 }),
        moment({ hour: 20, minute: 0 }),
      );
    },
  },
  methods: {
    handleSearch(query) {
      this.loading = true;
      this.query = query;
      this.fetchWeather();
      this.fetchForecast();
    },
    updateHour() {
      setInterval(() => {
        this.getHour();
      }, 60000);
    },
    async getHour() {
      this.cityLocalTime = await moment().tz(this.timezoneLookup);
      this.cityLocalTimeFormatted = await this.cityLocalTime.format('LT dddd');
    },
    getBackground() {
      const image = fetchBackgroundImage(this.code, this.isDayTime);
      image.then((img) => {
        this.backgroundImg = img;
      });
    },
    async fetchData(url) {
      let parameters;

      try {
        await geoApiInstance
          .get('/check', {
            params: {
              /* not delete for merge */
            },
          })
          .then((res) => {
            this.lat = res.data.latitude;
            this.lon = res.data.longitude;
          });

        if (this.query !== '') {
          parameters = {
            params: {
              q: this.query,
              units: 'metric',
              cnt: 10,
            },
          };
        } else {
          parameters = {
            params: {
              lat: this.lat,
              lon: this.lon,
              units: 'metric',
              cnt: 10,
            },
          };
        }
      } catch (error) {
        console.log(error);
      }
      return weatherApiInstance.get(url, parameters);
    },
    fetchLocalWeather() {
      this.query = '';
      this.fetchWeather();
      this.fetchForecast();
    },
    fetchForecast() {
      this.fetchData('/forecast')
        .then((res) => {
          const mapList = res.data.list.map((item) => {
            const { main, weather, dt } = item;
            setTimeout(() => {
              this.loading = false;
            }, 100);
            return {
              main,
              weather,
              dt: moment
                .unix(dt)
                .tz(this.timezoneLookup)
                .format('LT ddd'),
              id: shortid.generate(),
            };
          });
          this.threeHoursStream = mapList;
        })
        .catch((error) => {
          setTimeout(() => {
            this.error = true;
          }, 2000);
        });
    },
    fetchWeather() {
      this.fetchData('/weather').then((res) => {
        this.weather = res.data;
        this.lat = res.data.coord.lat;
        this.lon = res.data.coord.lon;
        this.timezoneLookup = tzlookup(this.lat, this.lon);
        this.getHour();
        this.code = res.data.weather[0].id;
        this.getBackground();
      });
    },
  },
  created() {
    this.fetchLocalWeather();
    this.updateHour();
  },
};
</script>

<style lang="scss"></style>
