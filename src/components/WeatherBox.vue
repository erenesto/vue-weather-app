<template>
  <div
    class="weather__box"
    :style="{ backgroundImage: bg ? `url(${require(`../assets/images/${bg}`)})` : '' }"
  >
    <WeatherInputVue @searchForCity="searchForCity" />

    <transition name="slide">
      <span v-if="!loading">
        <div class="weather__city">
          <div>
            <img
              :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
              alt
            />
            <div class="city">{{ `${weatherData.name}, ${weatherData.sys.country}` }}</div>
          </div>
          <div class="localtime">{{ time }}</div>
        </div>
        <div>
          <div class="weather">
            {{ weatherData.main.temp.toFixed(1) }}
            <span class="unit degree">&deg;C</span>
          </div>
        </div>
        <div>
          <div class="wind">
            {{ kmHour }}
            <span class="unit">km/h</span>
          </div>
        </div>
        <div class="text-temp">{{ weatherData.weather[0].description }}</div>
      </span>
    </transition>
  </div>
</template>

<script>
import WeatherInputVue from './WeatherInput.vue';

export default {
  name: 'WeatherBox',
  props: ['weatherData', 'time', 'loading', 'bg'],
  components: { WeatherInputVue },
  methods: {
    searchForCity(query) {
      this.$emit('searchForCity', query);
    },
  },
  computed: {
    kmHour() {
      return (this.weatherData.wind.speed * 3.6).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.localtime {
  font-size: 16px;
}
.city {
  margin: 5px 0;
}
.text-temp {
  margin-top: 5px;
}
</style>
