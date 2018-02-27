<template>
  <div @click="onOpenPeriod()" :style="{'background-color': color}">
    <div v-if="!monthChanges">
      <div class="m_0 weight_100 date absolute" v-if="period.periodType === 4">
        <span v-if="index < 7">{{weekDaysNames[date.weekDay]}}</span>
        <span>{{ date.string }}</span>
      </div>
      <div class="m_0 weight_100 date absolute" v-else-if="period.periodType === 3">
        <span v-date-text="{date: date, periodType: '3'}"></span>
      </div>
      <div class="m_0 weight_100 date absolute" v-else-if="period.periodType === 2">
        <span v-date-text="{date: period.dateString, periodType: '2'}"></span>
      </div>
    </div>
    <div class="layout justify-start" :class="{'row': period.periodType === 2, 'column': period.periodType !== 2}">
      <div class="align-center flex xs12 layout m_0 topline" v-for="(top, t) in period.tops" v-bind:key="t"
        :class="{'md2': period.periodType === 2, 'red--text': top.done === false, 'green--text': top.done === true}">
        <p class="mv_0 mr_4">
          <icon v-if="top.type === 0" name="crosshairs"></icon>
          <icon v-else-if="top.type === 1" name="exclamation-circle"></icon>
          <icon v-else-if="top.type === 2" name="hourglass-half"></icon>
          <icon v-else-if="top.type === 3" name="eye"></icon>
          <icon v-else-if="top.type === 4" name="birthday-cake"></icon>
        </p>
        <p class="m_0 nowrap">{{ top.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['period', 'index', 'monthChanges'],
  name: 'CalendarPeriod',
  created () {
  },
  methods: {
    onOpenPeriod () {
      this.$router.push({path: `/period/${this.period.dateString}/${this.period.periodType}`})
    },
    checkNumber (num) {
      return num < 10 ? `0${num}` : num
    }
  },
  computed: {
    color () {
      if (this.period.doings.done !== null) {
        const result = parseInt(this.period.doings.done * 255 / this.period.doings.maxDone)
        let color = `rgba(${255 - result}, ${result}, 0, .1)`
        return color
      }
    },
    date () {
      if (this.period.periodType === 4) {
        const d = this.period.date
        return {
          weekDay: d.getDay() === 0 ? 6 : d.getDay() - 1,
          string: `${d.getDate()} ${d.getDate() === 1 ? this.monthesNames[d.getMonth()] : ''}`
        }
      } else if (this.period.periodType === 3) {
        return this.period.dateString
      }
    }
  },
  data () {
    return {
      weekDaysNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      monthesNames: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек']
    }
  }
}
</script>

<style lang="scss" scoped>
  .topline {
    height: 19px;
    & > p {
      height: 19px;
      margin-right: 4px;
      display: block;
      line-height: 19px;
      // &:nth-child(1) {
      //   transform: translateY(-4px);
      // }
      &:nth-child(2) {
        width: calc(100% - 28px);
      }
    }
  }
  .date {
    top: 5px;
    right: 5px;
    line-height: 13px;
    color: lightgray;
    z-index: 1;
  }
</style>
