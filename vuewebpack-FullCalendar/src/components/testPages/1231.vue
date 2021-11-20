<template>
    <div>
        <date-picker v-model="time1" valueType="format" :disabled-days="disabledBefore" placeholder="select date" ></date-picker>
    <date-picker v-model="time2" type="datetime"></date-picker>
    <date-picker v-model="time3" range :disabled-days="disabledBefore"
    :not-after="disabledAfter"></date-picker>
        123

        <!-- <el-date-picker :lang="lang"></el-date-picker>
         -->

     <!-- <vue-datepicker-local v-model="time" />
     <vue-datepicker-local v-model="form.entryDate" style="width: 370px;"></vue-datepicker-local> -->
     <div id="app">
    <vue-datepicker-local v-model="time"></vue-datepicker-local>
  </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
        time: new Date(),
      time1: null,
        time2: null,
        time3: null,
        date: new Date(),
      min: '2020-12-12',
      max: '2020-12-12',
      disabledBefore: new Date(),
disabledAfter: new Date(2021, 10, 6),
lang: {
          formatLocale: {
            firstDayOfWeek: 1,
          },
          monthBeforeYear: false,
        },
    }
  }
}
</script>

<style lang="scss" scoped>

</style>