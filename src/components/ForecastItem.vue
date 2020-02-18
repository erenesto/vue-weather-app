<template>
  <span class="forecast">
    <div class="weather__forecast-icons">
      <img
        class="weather__fc-icon"
        alt="weather icon"
        :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
      />
    </div>
    <div class="weather__forecast-text">{{ item.dt }}</div>
    <div class="weather__forecast-temp">
      <span class="weather__frc-temp">{{ ceilingTemp(item) }}</span>
      <span class="weather__frc-degree" href="#">&deg;C</span>
    </div>
  </span>
</template>

<script>
export default {
  name: 'ForecastItemVue',
  props: ['item'],

  methods: {
    ceilingTemp(item) {
      return Math.ceil(item.main.temp);
    },
  },
};
</script>

<style lang="scss" scoped>
.forecast {
  width: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  flex: 1;
}
</style>
