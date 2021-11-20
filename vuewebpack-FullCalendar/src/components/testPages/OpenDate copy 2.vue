<template>
  <div>
    <button class="btn btn-sm btn-outline-success" @click="dateModal(false)">
      <i class="fas fa-store fa-2x"></i>新增營業時間
    </button>
    <button class="btn btn-outline-primary btn-sm" @click="dateModal(true)">
      <i class="fas fa-truck fa-2x"></i>新增外送時間
    </button>

    <a-calendar
      @select="onSelect"
      @panelChange="onPanelChange"
      :dateFullCellRender="dateCellRender"
    >
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <!-- <li v-for="item in getListData(value)" :key="item.date" :disabled="item.time < today.time ? '' : disabled"> -->
        <li v-for="item in getListData(value)" :key="item.date">
          <!-- <a-badge class="fas fa-truck" :status="item.type" :text="item.content" /> -->
          <!-- <div class="row">
      <i class="fas fa-box-open colorBlue  col-2 iPadding"></i>
      <p class=" txt-line-clamp1 col-8" v-text="item.content"></p>
  </div> -->
          <!-- <div class="row"> <i class="fas fa-box-open colorBlue iPadding"></i><p class=" txt-line-clamp1" v-text="item.content"></p></div> -->
          <p
            class="txt-line-clamp1"
            :class="{ bbb: value.unix() < today.time }"
          >
            <!-- <p class=" txt-line-clamp1 " > -->
            <i class="fas fa-store text-success" v-show="item.type === 1"></i>
            <i class="fas fa-truck text-primary" v-show="item.type === 2"></i>
            {{ item.startTime }} ~ {{ item.endTime }}
          </p>
        </li>
      </ul>
    </a-calendar>

    <!-- Modal -->
    <div
      class="modal fade"
      id="dateModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4
              class="modal-title text-success"
              id="exampleModalLabel"
              v-show="!out"
            >
              營業時間：
            </h4>
            <h4
              class="modal-title text-primary"
              id="exampleModalLabel"
              v-show="out"
            >
              外送時間：
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container thisModel">
              <h5>時間設定：</h5>
              <div>
                <div
                  class="row justify-content-around thisModelIn"
                  v-for="(item, index) in times"
                  :key="item.index"
                >
                <div >
                  <div v-on:click.capture="doThis('times', true, index)">
                    <a-time-picker
                      format="HH:mm"
                      @change="onChangeTimes"
                      v-model="scheduleRangeModal.times[index].startTime"
                      :minute-step="10"
                      :disabledHours="disabledHours"
                      :disabledMinutes="disabledMinutes"
                    />
                  </div>
                  <span class="text-danger" v-if="scheduleRangeModal.times[index].startTimeValidator ">"請設定時間"</span>
                </div>
                  <p>~</p>
                  <div v-on:click.capture="doThis('times', false, index)">
                    <a-time-picker
                      format="HH:mm"
                      @change="onChangeTimes"
                      v-model="scheduleRangeModal.times[index].endTime"
                      :minute-step="10"
                      :disabledHours="disabledHours"
                      :disabledMinutes="disabledMinutes"
                    />
                  </div>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteTime(index)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <div>
                <button
                  class="btn btn-sm btn-outline-success"
                  v-show="times.length < 3"
                  @click="addTime('other')"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="container thisModel">
              <h5>日期設定：</h5>
              <a-range-picker
                class="align-self-center"
                :disabled-date="disabledDate"
                format="YYYY-MM-DD "
                @change="onChange"
              />
            </div>

            <div class="container thisModel">
              <h5>重複設定：</h5>

              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadio1"
                  v-model="scheduleRangeModal.rangeType"
                  name="everyRadio"
                  class="custom-control-input"
                  value="everyDay"
                />
                <label class="custom-control-label" for="customRadio1" checked
                  >每天</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadio2"
                  v-model="scheduleRangeModal.rangeType"
                  name="everyRadio"
                  class="custom-control-input"
                  value="everyWeek"
                />
                <label class="custom-control-label" for="customRadio2"
                  >每星期</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadio2"
                  v-model="scheduleRangeModal.rangeType"
                  name="everyRadio"
                  class="custom-control-input"
                  value="everyMonth"
                  disabled
                />
                <label class="custom-control-label" for="customRadio3"
                  >每月</label
                >
              </div>


              <div v-show="scheduleRangeModal.rangeType == 'everyWeek'">
                <input type="checkbox" id="jack" value=1 v-model="scheduleRangeModal.rangeNumber">
                <label for="jack">星期一</label>
                <input type="checkbox" id="john" value=2 v-model="scheduleRangeModal.rangeNumber">
                <label for="john">星期二</label>
                <input type="checkbox" id="mike" value=3 v-model="scheduleRangeModal.rangeNumber">
                <label for="mike">星期三</label>
                <input type="checkbox" id="mike" value=4 v-model="scheduleRangeModal.rangeNumber">
                <label for="mike">星期四</label>
                <input type="checkbox" id="mike" value=5 v-model="scheduleRangeModal.rangeNumber">
                <label for="mike">星期五</label>
                <input type="checkbox" id="mike" value=6 v-model="scheduleRangeModal.rangeNumber">
                <label for="mike">星期六</label>
                <input type="checkbox" id="mike" value=7 v-model="scheduleRangeModal.rangeNumber">
                <label for="mike">星期日</label>
<!-- <br>
<span>Checked names: {{ scheduleRangeModal.rangeNumber }}</span> -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="schedules">確定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="thisDateModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">
              {{ thisDate.date.format("YYYY-MM-DD") }}
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container thisModel">
              <h4 class="fas fa-store text-success">營業時間：</h4>
              <div>
                <div
                  class="row justify-content-around thisModelIn"
                  v-for="(item, index) in thisDate.openTime"
                  :key="item.index"
                >
                  <div v-on:click.capture="doThis('openTime', true, index)">
                    <a-time-picker
                      format="HH:mm"
                      @change="onChangeOpenTime"
                      :minute-step="10"
                      v-model="thisDate.openTime[index].startTime"
                      :disabledHours="disabledHours"
                      :disabledMinutes="disabledMinutes"
                      name="openTime"
                      :class="{ 'is-invalid': errors.has('openTime') }"
                      v-validate="'required'"
                    />
                  </div>
                  <p>~</p>
                  <div v-on:click.capture="doThis('openTime', false, index)">
                    <a-time-picker
                      format="HH:mm"
                      @change="onChangeOutTime"
                      :minute-step="10"
                      v-model="thisDate.openTime[index].endTime"
                      :disabledHours="disabledHours"
                      :disabledMinutes="disabledMinutes"
                      name="openTime"
                      :class="{ 'is-invalid': errors.has('openTime') }"
                      v-validate="'required'"
                    />
                  </div>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteOpenTime(index)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
                <div class="w-100 container">
                  <span class="text-danger" v-if="errors.has('openTime')"
                    >請輸入時間</span
                  >
                  <span class="text-danger" v-if="openOverlapping"
                    >時間重疊</span
                  >
                </div>
              </div>

              <div>
                <button
                  class="btn btn-sm btn-outline-success"
                  v-show="thisDate.openTime.length < 3"
                  @click="addTime('open')"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <div class="container thisModel">
              <h4 class="fas fa-truck text-primary">外送時間：</h4>
              <div>
                <div
                  class="row justify-content-around thisModelIn"
                  v-for="(item, index) in thisDate.outTime"
                  :key="item.index"
                >
                  <div v-on:click.capture="doThis('outTime', true, index)">
                    <!-- <div class="container"> -->
                    <div class="text-left">
                      <a-time-picker
                        :key="item.index"
                        format="HH:mm"
                        @change="onChangeOutTime"
                        :minute-step="10"
                        v-model="thisDate.outTime[index].startTime"
                        :disabledHours="disabledHours"
                        :disabledMinutes="disabledMinutes"
                        name="outTime"
                        :class="{ 'is-invalid': errors.has('outTime') }"
                        v-validate="'required'"
                      />
                    </div>

                    <!-- <div class="text-left">
                        <span class="text-danger" v-if="errors.has('outTime')" :key="item.index"
                          >請輸入時間---</span
                        >
                      </div> -->
                    <!-- </div> -->
                  </div>
                  <p>~</p>
                  <div v-on:click.capture="doThis('outTime', false, index)">
                    <a-time-picker
                      format="HH:mm"
                      @change="onChangeOutTime"
                      :minute-step="10"
                      v-model="thisDate.outTime[index].endTime"
                      :disabledHours="disabledHours"
                      :disabledMinutes="disabledMinutes"
                      name="outTime"
                      :class="{ 'is-invalid': errors.has('outTime') }"
                      v-validate="'required'"
                    />
                  </div>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteOutTime(index)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
                <div class="w-100 container">
                  <span class="text-danger" v-if="errors.has('outTime')"
                    >請輸入時間</span
                  >
                  <span class="text-danger" v-if="outOverlapping"
                    >時間重疊</span
                  >
                </div>
              </div>
              <div>
                <button
                  class="btn btn-sm btn-outline-primary"
                  v-show="thisDate.outTime.length < 3"
                  @click="addTime('out')"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="thisDateModalPut(thisDate)"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import $ from "jquery";
export default {
  data() {
    return {
      hours: [],
      // minutes: [],
      minuteList: [],
      hour: null,
      valueModel: "",
      value: moment(new Date()),
      selectedValue: moment("2017-01-25"),
      value1: [],
      startTime: "10:00:00",
      deletTime: "123456548694",
      openOverlapping: false,
      outOverlapping: false,
      timeOverlapping: false,
      checkedNames: [],
      scheduleRangeModal: {
        times :[{ startTime: null, endTime: null,startTimeValidator : false, endTimeValidator: false }],
        startDate:null,
        startDateValidator:false,
        endDate:null,
        endDateValidator:false,
        rangeType: null,
        rangeTypeValidator: false,
        rangeNumber: [],
      },
      scheduleRange: {
        times: [{ startTime: null, endTime: null }],
        startDate:null,
        endDate:null,
        rangeType: null,
        rangeNumber: [],
      },
      times: [{ startTime: null, endTime: null }],
      // dateRange: [],
      every: "",
      // startMonthWeek:moment().startOf(value.startOf()),
      // endMonthWeek:moment().startOf(value.endOf()),
      startMonthWeek: moment(new Date()),
      endMonthWeek: moment(new Date()),

      calendarSchedule: [
        {
          date: "",
          schedules: [],
        },
      ],

      // hour: null,
      // minute: null,
      thisDate: {
        date: moment(new Date()),
        openTime: [{ startTime: null, endTime: null }],
        outTime: [{ startTime: null, endTime: null }],
      },
      out: true,
      timeString1: "",
      // time:"",
      // timeString:"",
      today: {
        year: 0,
        month: 0,
        date: 0,
        day: 0,
        time: 0,
      },

      calendar: {
        year: 0,
        month: 0,
        date: 0,
        day: 0,
        time: 0,
      },
    };
  },
  // mounted(){
  //           this.setToday()
  //         },
  methods: {
    moment,
    onChange(dates, dateString) {
      console.log("onChange(out,timeString1,time, timeString)");
      console.log(dates, dateString);
      this.scheduleRangeModal.startDate=dateString[0]
      this.scheduleRangeModal.endDate=dateString[1]
    },
    schedules(){

      console.log("thisDateModalPut(thisDate)");
      console.log("date", this.scheduleRangeModal);
      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.ADMIN}/schedules`;

      vm.$validator.validate().then((result) => {
        if (result) {
        //   vm.timeOverlapping = false;
        //   vm.scheduleRangeModal.times.forEach((v1, index1, array) => {
        //     array.forEach((v2, index2) => {
        //       if (index1 != index2) {
        //         if (v1.startTime <= v2.endTime && v1.endTime >= v2.startTime) {
        //           vm.timeOverlapping = true;
        //         }
        //       }
        //     });
        //   });



        //   if (vm.timeOverlapping) {
        //     return;
        //   }

          let scheduleRequest = Object.assign({}, vm.scheduleRangeModal);
          scheduleRequest.startDate = scheduleRangeModal.dateRange[0].format("YYYY-MM-DD");
          scheduleRequest.endDate = thisDate.dateRange[1].format("YYYY-MM-DD");
          console.log("vm.thisDate", scheduleRequest);
          this.$http.put(api, scheduleRequest).then((response) => {
            // vm.status.loadingItem = "";
            console.log("products:response", response.data);
            if (response.data.success) {
              $("#thisDateModal").modal("hide");

              vm.dateCellRender(vm.value);
            } else {
              vm.$bus.$emit("message:push", response.data.message, "danger");
            }
          });
        }
      });
    },
    //依照日期修改
    thisDateModalPut(thisDate) {
      console.log("thisDateModalPut(thisDate)");
      console.log("date", thisDate);
      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.ADMIN}/schedule`;

      vm.$validator.validate().then((result) => {
        if (result) {
          vm.openOverlapping = false;
          thisDate.openTime.forEach((v1, index1, array) => {
            array.forEach((v2, index2) => {
              if (index1 != index2) {
                if (v1.startTime <= v2.endTime && v1.endTime >= v2.startTime) {
                  vm.openOverlapping = true;
                }
              }
            });
          });
          vm.outOverlapping = false;
          thisDate.outTime.forEach((v1, index1, array) => {
            array.forEach((v2, index2) => {
              if (index1 != index2) {
                if (v1.startTime <= v2.endTime && v1.endTime >= v2.startTime) {
                  console.log(
                    "return無作用??vm.outOverlapping",
                    vm.outOverlapping
                  );
                  vm.outOverlapping = true;
                }
              }
            });
          });

          if (vm.outOverlapping || vm.openOverlapping) {
            return;
          }

          let scheduleRequest = Object.assign({}, thisDate);
          scheduleRequest.date = thisDate.date.format("YYYY-MM-DD");
          console.log("vm.thisDate", scheduleRequest);
          this.$http.put(api, scheduleRequest).then((response) => {
            // vm.status.loadingItem = "";
            console.log("products:response", response.data);
            if (response.data.success) {
              $("#thisDateModal").modal("hide");

              vm.dateCellRender(vm.value);
            } else {
              vm.$bus.$emit("message:push", response.data.message, "danger");
            }
          });
        }
      });
    },

    //偵測日期設定時間
    doThis(type, startTime, index) {
      let vm = this;

      console.log(
        "****************doThis():*****start",
        type,
        startTime,
        index
      );

      let timeList;

      switch (type) {
        case "openTime":
          console.log("openTime", vm.thisDate.openTime);
          timeList = vm.thisDate.openTime;
          break;
        case "outTime":
          console.log("outTime", vm.thisDate.outTime);
          timeList = vm.thisDate.outTime;
          break;
        case "times":
          console.log("times", vm.times);
          timeList = vm.times;
          break;
      }
      console.log("timeList", timeList);
      vm.hour = null;
      // vm.minutes = null;
      vm.hours = [];
      vm.minuteList = [];
      let momentList = [];

      let timeOpen = {
        start: null,
        end: null,
      };
      let startNull = true;
      let endNull = true;

      //設定timeOpen startTime
      if (startTime && timeList[index].endTime != null) {
        endNull = false;
        timeOpen.end = timeList[index].endTime;
        timeOpen.start = moment().set("hours", 0).set("minutes", 0);
        timeList.forEach(function (item, ind, array) {
          if (index != ind) {
            if (item.startTime != null) {
              startNull = false;
              momentList.push(item.startTime);
            }
            if (item.endTime != null) {
              startNull = false;
              momentList.push(item.endTime);
            }
          }
        });
        if (momentList.length > 0) {
          momentList.forEach(function (item, ind, array) {
            if (
              item != null &&
              item.unix() > timeOpen.start.unix() &&
              item.unix() < timeOpen.end.unix()
            ) {
              timeOpen.start = item;
            }
          });
        }
        console.log("momentList", momentList);

        //設定timeOpen endTime
      } else if (!startTime && timeList[index].startTime != null) {
        startNull = false;
        timeOpen.end = moment().set("hours", 23).set("minutes", 50);
        timeOpen.start = timeList[index].startTime;
        timeList.forEach(function (item, ind, array) {
          if (index != ind) {
            if (item.startTime != null) {
              endNull = false;
              momentList.push(item.startTime);
            }
            if (item.endTime != null) {
              endNull = false;
              momentList.push(item.endTime);
            }
          }
        });
        if (momentList.length > 0) {
          momentList.forEach(function (item, ind, array) {
            if (
              item != null &&
              item.unix() > timeOpen.start.unix() &&
              item.unix() < timeOpen.end.unix()
            ) {
              timeOpen.end = item;
            }
          });
        }
      }
      if (timeOpen.start != null && timeOpen.end != null) {
        for (i = 0; i < 24; i++) {
          if (
            i < Number(timeOpen.start.hours()) ||
            i > Number(timeOpen.end.hours())
          ) {
            vm.hours.push(i);
          }
        }
        if (timeOpen.start.minutes() == 50) {
          vm.hours.push(timeOpen.start.hours());
        } else if (!startNull) {
          let minutes = {
            hour: null,
            minute: [],
          };

          minutes.hour = timeOpen.start.hours();
          for (var i = 0; i <= parseInt(timeOpen.start.minutes()); i += 10) {
            minutes.minute.push(i);
          }
          vm.minuteList.push(minutes);
        }

        if (timeOpen.end.minutes() == 0) {
          vm.hours.push(timeOpen.start.hours());
        } else if (!endNull) {
          let minutes = {
            hour: null,
            minute: [],
          };
          minutes.hour = timeOpen.end.hours();
          for (var i = 50; i >= parseInt(timeOpen.end.minutes()); i -= 10) {
            minutes.minute.push(i);
          }
          vm.minuteList.push(minutes);
        }

        //前後無值
      } else {
        console.log("----------前後無值 ----------");
        let other = [];
        timeList.forEach(function (item, ind, array) {
          if (index != ind) {
            if (item.startTime != null) {
              other.push(item.startTime.hours());
            }
            if (item.endTime != null) {
              other.push(item.endTime.hours());
            }
            if (item.startTime != null && item.endTime != null) {
              console.log(
                "-----前後無值 ------item.startTime.hours() && i < item.endTime.hours()",
                item.startTime.hours(),
                item.endTime.hours()
              );
              for (let i = 0; i < 24; i++) {
                if (i > item.startTime.hours() && i < item.endTime.hours()) {
                  vm.hours.push(i);
                }
              }

              if (item.startTime.minutes() == 0) {
                vm.hours.push(item.startTime.hours());
              } else {
                let minutes = {
                  hour: null,
                  minute: [],
                };
                minutes.hour = item.startTime.hours();
                for (
                  let i = 50;
                  i >= parseInt(item.startTime.minutes());
                  i -= 10
                ) {
                  minutes.minute.push(i);
                }

                vm.minuteList.push(minutes);
                console.log(
                  "vm.minuteList.push(minutes);",
                  vm.minuteList.push(minutes)
                );
              }

              if (item.endTime.minutes() == 50) {
                vm.hours.push(item.endTime.hours());
              } else {
                let minutes = {
                  hour: null,
                  minute: [],
                };
                minutes.hour = item.endTime.hours();
                for (
                  var i = 0;
                  i <= parseInt(item.endTime.minutes());
                  i += 10
                ) {
                  minutes.minute.push(i);
                }
                vm.minuteList.push(minutes);
              }
            } else {
              let minutes = {
                hour: null,
                minute: [],
              };
              if (item.startTime != null) {
                (minutes.hour = item.startTime.hours()),
                  minutes.minute.push(item.startTime.minutes());
              } else if (item.endTime != null) {
                minutes.hour = item.endTime.hours();
                minutes.minute.push(item.endTime.minutes());
              }
              vm.minuteList.push(minutes);
            }
          }
        });

        console.log("other", other);
        var repeat = other.filter(function (item, ind, array) {
          return array.indexOf(item) !== ind;
        });
        console.log("repeat", repeat);
        vm.hours.push(repeat[0]);
      }
    },

    //取禁止選則的小時
    disabledHours() {
      let vm = this;
      console.log("************disabledHours():****vm.hours", vm.hours);
      return vm.hours;
    },

    //取禁止選則的分鐘
    disabledMinutes(selectedHour) {
      let vm = this;
      let minutes = [];
      console.log("vm.minuteList", vm.minuteList);

      vm.minuteList.forEach(function (item, index, array) {
        if (item.hour == selectedHour) {
          minutes = item.minute;
        }
      });
      console.log("disabledEndMinutes(selectedHour)------minutes", minutes);

      return minutes;
    },

    //刪除一排時間
    deleteOpenTime(index) {
      this.thisDate.openTime.splice(index, 1);
    },
    deleteOutTime(index) {
      this.thisDate.outTime.splice(index, 1);
    },
    deleteTime(index) {
      this.times.splice(index, 1);
    },

    onChangeOpenTime(time, timeString) {
      console.log("time", "timeString");
      console.log(time, timeString);
      console.log("---------unix()-------------");
      const openTime = this.thisDate.openTime;
      console.log("openTime", openTime[0].startTime.unix());
      let i;
      let j;
      if (openTime.length > 1) {
        console.log("---onChangeOpenTime(time, timeString)-----開始");
        for (i = 0; i < openTime.length - 1; i++) {
          if (
            i != j &&
            openTime[i].startTime != null &&
            openTime[i].endTime != null
          ) {
            for (j = 1; j < openTime.length; j++) {
              if (
                i != j &&
                openTime[j].startTime != null &&
                openTime[j].endTime != null
              ) {
                console.log("--- if( i!=j &&------unix()-------------");
                console.log(
                  openTime[i].startTime.unix(),
                  openTime[j].endTime.unix(),
                  openTime[i].endTime.unix(),
                  openTime[j].startTime.unix()
                );
                if (
                  openTime[i].startTime.unix() < openTime[j].endTime.unix() &&
                  openTime[i].endTime.unix() > openTime[j].startTime.unix()
                ) {
                  console.log("中獎..........");
                }
                console.log("---onChangeOpenTime(time, timeString)-----結束");
              }
            }
          }
        }
      }
    },

    //
    onChangeOutTime(time, timeString) {
      console.log("---onChangeOutTime(time, timeString)-----開始");
      console.log("time", "timeString");
      console.log(time, timeString);
      console.log("thisDate", this.thisDate);
      const outTime = this.thisDate.outTime;
      let i;
      let j;
      if (outTime.length > 1) {
        for (i = 0; i < outTime.length - 1; i++) {
          if (
            i != j &&
            outTime[i].startTime != null &&
            outTime[i].endTime != null
          ) {
            for (j = 1; j < outTime.length; j++) {
              if (
                i != j &&
                outTime[j].startTime != null &&
                outTime[j].endTime != null
              ) {
                console.log("中獎..........");
              }
              console.log("---onChangeOutTime(time, timeString)-----結束");
            }
          }
        }
      }
    },

    onChangeTimes(time, timeString) {
      // const times = this.times;
      // console.log("times", this.times);
      // let i;
      // let j;
      // if (times.length > 1) {
      //   for (i = 0; i < times.length - 1; i++) {
      //     if (
      //       i != j &&
      //       times[i].startTime != null &&
      //       times[i].endTime != null
      //     ) {
      //       for (j = 1; j < times.length; j++) {
      //         if (
      //           i != j &&
      //           times[j].startTime != null &&
      //           times[j].endTime != null
      //         ) {
      //           console.log("times[i].startTime", times[i].startTime);
      //           console.log("times[i].endTime", times[i].endTime);
      //           console.log("times[j].startTime", times[j].startTime);
      //           console.log("times[j].endTime", times[j].endTime);
      //         }
      //       }
      //     }
      //   }
      // }
    },

    //新增modal時間
    addTime(choose) {
      let time = {
        startTime: null,
        endTime: null,
      };
      switch (choose) {
        case "open":
          this.thisDate.openTime.push(time);
          break;
        case "out":
          this.thisDate.outTime.push(time);
          break;
        case "other":
          this.times.push(time);
          break;
      }
      console.log("this.times", this.times);
    },

    //設定過期時間變色用
    setToday() {
      console.log("today");
      console.log("today", this.today);
      const date = moment(new Date());
      this.today.year = this.calendar.year = date.year();
      this.today.month = this.calendar.month = date.month(); // 0~11
      this.today.date = this.calendar.date = date.date();
      this.today.day = this.calendar.day = date.day();
      this.today.time = this.calendar.time = date.unix();
    },

    onPanelChange(value) {
      this.value = value;
      console.log("onPanelChange()", value);

      let startDateMoment = moment(value.format("YYYY-MM-DD"))
        .startOf("month")
        .startOf("week");
      let startDate = startDateMoment.format();
      let endDate = startDateMoment.add(41, "days").format();
      console.log("startDate", startDate);
      console.log("endDate", endDate);

      const api = `${process.env.APIPATH}/admin/schedules?startDate=${startDate}&endDate=${endDate}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("response", response);
        if (response.data.success) {
          console.log("response.data.data", response.data.data);
          vm.isLoading = false;
          vm.calendarSchedule = response.data.data;
          console.log(response.data);
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        }
      });
    },

    //取值，會自動偵測資料變化自動帶值，還在研究
    getListData(value) {
      let listData;
      console.log("value.month()", value.month());
      let vm = this;
      var newDataList = [];
      vm.calendarSchedule.forEach((e) => {
        let now = moment(value.format("YYYY-MM-DD")).unix();
        if (moment(e.date).unix() === now) {
          newDataList.push(e.schedules);
          console.log("重大講了", newDataList);
        }
      });
      listData = newDataList;
      return listData[0] || [];
    },

    //左上角的新增營業時和外送時間的開啟modal
    dateModal(out) {
      //test
      console.log("getProducts(page = 1) ");
      //開啟網頁就創建
      const vm = this;
      const api = `${process.env.APIPATH}/admin/aa`;

      this.$http.get(api).then((response) => {
        console.log("~~~~~~~~~~~~~~~~");
        console.log("products:response", response);

        if (response.data.success) {
          this.out = out;
          let times = [{ startTime: null, endTime: null }];
          vm.times = times;
          console.log("openDateModal()");
          $("#dateModal").modal("show");
        }
      });
    },

    //沒用到，暫時用別的方法實現
    openThisDateModal(item) {
      $("#thisDateModal").modal("show");
      this.tempProduct = Object.assign({}, item);
    },

    //Ant Design Vue DatePicker
    // range(start, end) {
    //   const result = [];
    //   for (let i = start; i < end; i++) {
    //     result.push(i);
    //   }
    //   return result;
    // },

    //沒用到，disabled過期日期設定，暫時用別的方法實現
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    },

    //開啟thisDateModal
    onSelect(date) {
      const vm = this;
      console.log("onSelect()", date.format());
      const getByDate = date.format();

      console.log("date.getTime", date.unix());
      console.log("vm.today.getTime", vm.today.time);

      if (date.unix() + 1 < vm.today.time) {
        vm.$bus.$emit("message:push", "過去的時間不能改.....", "danger");

        return;
      }
      let api = `${process.env.APIPATH}/admin/schedule?date=${getByDate}`;

      this.$http.get(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $("#thisDateModal").modal("show");
          console.log("response.data.data", response.data.data);
          vm.thisDate.date = date;
          let times = response.data.data;
          console.log("times", times);
          vm.thisDate.openTime = [];
          vm.thisDate.outTime = [];
          for (let i = 0; i < times.length; i++) {
            let time = {
              id: 10 + i,
              startTime: moment(times[i].startTime, "HH:mm:ss"),
              endTime: moment(times[i].endTime, "HH:mm:ss"),
            };
            if (times[i].type == 1) {
              vm.thisDate.openTime.push(time);
            } else if (times[i].type == 2) {
              vm.thisDate.outTime.push(time);
            }
          }

          if (times.length === 0) {
            let time = {
              startTime: null,
              endTime: null,
            };
            vm.thisDate.openTime.push(time);
          }
          console.log("取值成功", vm.thisDate);
        } else {
          console.log("取值失敗");
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },

    //取日歷資料
    // getSchedul(start, end) {
    //   console.log(start, end);

    //   let endMoment = end;
    //   console.log("endMoment", endMoment);
    //   let startDate = start.startOf("month").startOf("week").format();
    //   let endDate = start.add(41, "days").format();

    //   console.log("startDate", startDate);
    //   console.log("endDate", endDate);

    //   const api = `${process.env.APIPATH}/admin/schedules?startDate=${startDate}&endDate=${endDate}`;
    //   const vm = this;
    //   console.log(process.env.APIPATH, process.env.CUSTOMPATH);
    //   vm.isLoading = true;
    //   this.$http.get(api).then((response) => {
    //     console.log("response", response);
    //     vm.isLoading = false;
    //     console.log(response.data);
    //     vm.products = response.data.products;
    //     vm.pagination = response.data.pagination;
    //   });
    // },

    //取日歷資料
    dateCellRender(momenta) {
      console.log("dateCellRender(moment)*-/-/*/-/-/-/", momenta);

      let startDateMoment = moment(momenta.format())
        .startOf("month")
        .startOf("week");
      let startDate = startDateMoment.format();
      let endDate = startDateMoment.add(41, "days").format();

      console.log("startDate", startDate);
      console.log("endDate", endDate);

      const api = `${process.env.APIPATH}/admin/schedules?startDate=${startDate}&endDate=${endDate}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.get(api).then((response) => {
        console.log("response.data---", response.data);
        console.log("response.data.success---", response.data.success);
        if (response.data.success) {
          // vm.isLoading = false;
          console.log("response.data.data---", response.data.data);
          vm.calendarSchedule = response.data.data;
          console.log(response.data);
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        }
      });

      return moment.unix();
    },
  },
  created() {
    this.setToday();
    this.dateCellRender(this.startMonthWeek);
  },
};
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
.txt-line-clamp1 {
  width: 80%;
  /* border:solid 1px #ccc; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 6px;
  padding-right: 10px;
  margin: 1px;
}
.colorBlue {
  color: rgba(0, 0, 255, 0.534);
}
.colorGreen {
  color: rgba(7, 121, 64, 0.534);
}

.bbb {
  color: rgba(66, 49, 49, 0.342);
}
.thisModel {
  padding: 14px;
  margin: 1px;
}
.thisModelIn {
  padding-top: 6px;
  margin: 1px;
}

.bs-example {
  margin: 20px;
}
</style>