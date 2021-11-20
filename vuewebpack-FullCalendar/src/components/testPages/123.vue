<template>
<div class="text-center">
  <date-picker v-model="date" type="date" :min="min" :max="max" RangeLayout/>
  <date-picker  v-model="date" type="date" :min="min" :max="max2" picker-range  ></date-picker> 
  <date-picker  v-model="time" type="time"    ></date-picker> 
  <picker-range  v-model="time" type="time"    ></picker-range> 
  <!-- <date-picker  v-model="date2" type="date" :min="min2" :max="max2" value-class="Select a Range"  default show-lunar ></date-picker> --> -->
  <!-- <date-picker type="date" v-model="date" show-lunar/>
    <date-picker type="date" v-model="date" show-lunar show-festival />

    <span class="date-picker--icon datepicker-iconfont">::before</span> -->
  <!-- <date-picker range>
  <template v-slot:title>
    <div>左侧的标题</div>
    <div>右侧的标题</div>
  </template>
</date-picker> -->


<!-- <date-picker range>
  <template v-slot:title>
    <div>左侧的标题</div>
    <div>右侧的标题</div>
  </template>
</date-picker> -->


<!-- <div class="date-picker--container" data-v-0615f3e5=""><span class="date-picker--icon datepicker-iconfont"></span><div class="date-picker--range-begin"><input type="text" value="2021-09-16" readonly="readonly" disabled="disabled" placeholder="起始日期"></div><div class="date-picker--range-separator"></div><div class="date-picker--range-end"><input type="text" value="2021-10-21" readonly="readonly" disabled="disabled" placeholder="结束日期"></div></div> -->
<div>{{other.getMonth()}}</div>

</div>


</template>
<script>


export default {
//   components: {DatePicker},
  data() {
    return {
      date: new Date(),
      // date1: new Date(),
      // date2: new Date(),
      min: new Date(),
      // min1: new Date(),
      // min2: date1,
      other: new Date(),
      max: new Date(),
      max1: new Date(),

      aaa:'',
      max2: new Date(new Date().getFullYear,new Date().getMonth(),new Date().getDate()),
      // max2: new Date(other.getFullYear(),other.getMonth(),other.getDate()),

    }
  }
}
</script>