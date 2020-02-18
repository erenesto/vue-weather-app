<template>
  <div class="weather__other-days">
    <div class="weather__forecast-day" v-for="item in threeHoursStream" :key="item.id">
      <transition name="slide">
        <ForecastItemVue :item="item" v-if="!loading" />
      </transition>
    </div>
  </div>
</template>

<script>
import ForecastItemVue from './ForecastItem.vue';

export default {
  name: 'WeatherForecast',
  props: ['threeHoursStream', 'loading'],
  components: { ForecastItemVue },
  data() {
    return {
      transition: false,
    };
  },
  methods: {
    toggleTransition() {
      this.transition = !this.transition;
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-40%);
}

.slide-enter-active {
  transition: opacity 0.5s, transform 1s;
}
.slide-leave-active {
  transition: opacity 0.5s, transform 1s;
}
</style>
