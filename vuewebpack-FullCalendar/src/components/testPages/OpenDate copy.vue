<template>
  <div>
    <button class="btn btn-sm btn-outline-success" @click="openDateModal">
      <i class="fas fa-store fa-2x"></i>新增營業時間
    </button>
    <button class="btn btn-outline-primary btn-sm">
      <i class="fas fa-truck fa-2x"></i>新增外送時間
    </button>

    <a-calendar :value="value" @select="onSelect" @panelChange="onPanelChange">
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <li v-for="item in getListData(value)" :key="item.date">
          <!-- <a-badge class="fas fa-truck" :status="item.type" :text="item.content" /> -->
          <!-- <div class="row">
      <i class="fas fa-box-open colorBlue  col-2 iPadding"></i>
      <p class=" txt-line-clamp1 col-8" v-text="item.content"></p>
  </div> -->
          <!-- <div class="row"> <i class="fas fa-box-open colorBlue iPadding"></i><p class=" txt-line-clamp1" v-text="item.content"></p></div> -->
          <p
            class="txt-line-clamp1"
            :class="{ bbb: value.unix() < today.time / 1000 }"
          >
            <!-- value.unix() 取moment的毫秒數 -->
            <!-- <p class=" txt-line-clamp1 " > -->
            <i
              class="fas fa-store text-success"
              v-show="item.type === 'green'"
            ></i>
            <i
              class="fas fa-truck text-primary"
              v-show="item.type === 'blue'"
            ></i>
            {{ today.time }} ,{{ value.unix() }}
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
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary">確定</button>
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
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">
              {{ thisDate.date }}
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
              <h4 class="fas fa-store text-success col-sm-12">營業時間：</h4>
              <div>
                <div
                  class="row justify-content-around thisModelIn"
                  v-for="item in openTimeCount"
                  :key="item.index"
                >
                  <a-time-picker format="HH:mm" @change="onChange(false)" />
                  <p>~</p>
                  <a-time-picker format="HH:mm" @change="onChange" />
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteOpenTime(index)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>

              <div>
                <button
                  class="btn btn-sm btn-outline-success"
                  v-show="openTimeCount.length < 3"
                  @click="addOpenTime"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            

            <div class="container thisModel">
              <h4 class="fas fa-truck text-primary col-sm-12">外送時間：</h4>
              <div
                class="row justify-content-around thisModelIn"
                v-for="(item, index) in thisDate.outTime"
                :key="item.index"
              >
                <el-time-select
                  v-model="thisDate.outTime[index].startTime"
                  :key="item.index"
                  size="medium"
                  align="center"
                  :picker-options="{
                    start: '08:30',
                    step: '00:10',
                    end: '18:30',
                  }"
                  placeholder="选择时间"
                >
                </el-time-select>
                <p>~</p>
                <el-time-select
                  v-model="thisDate.outTime[index].endTime"
                  :key="item.index"
                  size="medium"
                  align="center"
                  :picker-options="{
                    start: '08:30',
                    step: '00:10',
                    end: '18:30',
                  }"
                  placeholder="选择时间"
                >
                </el-time-select>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteOutTime(index)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
              <button
                class="btn btn-sm btn-outline-primary thisModelIn"
                v-show="thisDate.outTime.length < 3"
                @click="addOutTime"
              >
                <i class="fas fa-plus"></i>
              </button>
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
            <button type="button" class="btn btn-primary">確定</button>
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
      valueNew: "",
      value: moment(new Date()),
      selectedValue: moment("2017-01-25"),
      value1: moment("2017-01-25"),
      openTimeCount: [1],
      outTimeCount: 1,
      thisDate: {
        date: "2017-01-25",
        time: "123456123456",
        openTime: [{ startTime: "", endTime: "" }],
        outTime: [{ startTime: "", endTime: "" }],
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
    deleteOpenTime(index) {
      this.thisDate.openTime.splice(index - 1, 1);
    },
    deleteOutTime(index) {
      console.log("deleteOutTime(index)", index);
      console.log("this.thisTime", this.thisDate);
      this.thisDate.outTime.splice(index - 1, 1);
    },
    onChange(out, timeString1, time, timeString) {
      console.log(out, timeString1, time, timeString);
    },
    onChange1(time, timeString) {
      console.log("time", "timeString");
      console.log(time, timeString);
    },
    addOpenTime() {
      let time = {
        startTime: "",
        endTime: "",
      };

      this.thisDate.openTime.push(time);
      console.log("this.openTimeCount", this.openTimeCount);
    },
    addOutTime() {
      let time = {
        startTime: "",
        endTime: "",
      };

      this.thisDate.outTime.push(time);
      console.log("this.openTimeCount", this.openTimeCount);
    },
    moment() {},
    setToday() {
      console.log("today");
      console.log("today", this.today);
      const date = new Date();
      this.today.year = this.calendar.year = date.getFullYear();
      this.today.month = this.calendar.month = date.getMonth(); // 0~11
      this.today.date = this.calendar.date = date.getDate();
      this.today.day = this.calendar.day = date.getDay();
      this.today.time = this.calendar.time = date.getTime();
    },
    onSelect(value) {
      // this.value = value;
      // this.selectedValue = value;
      // console.log('onSelect()',value)
      $("#thisDateModal").modal("show");
    },
    onPanelChange(value) {
      this.value = value;
      console.log("onPanelChange()", value);
    },
    getListData(value) {
      let listData;

      console.log("value.month()", value.month());
      console.log("calendar.month", this.calendar.month);
      if (value.month() === this.calendar.month) {
        switch (value.date()) {
          case 8:
            listData = [
              { type: "green", content: "08:00 ~ 22:00" },
              { type: "green", content: "08:00 ~ 22:00" },
            ];
            break;
          case 10:
            listData = [
              { type: "green", content: "08:00 ~ 22:00" },
              { type: "green", content: "08:00 ~ 22:00" },
              { type: "blue", content: "08:00 ~ 22:00" },
            ];
            break;
          case 15:
            listData = [
              { type: "green", content: "08:00 ~ 22:00" },
              {
                type: "green",
                content: "This is very long usual event。。....",
              },
              { type: "blue", content: "000000000000000" },
              { type: "blue", content: "This is error event 2." },
              { type: "error", content: "This is error event 3." },
              { type: "error", content: "This is error event 4." },
            ];
            break;
          default:
        }
      }
      return listData || [];
    },
    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    openDateModal() {
      console.log("openDateModal()");
      $("#dateModal").modal("show");
      // this.tempProduct = Object.assign({}, item);
    },
    openThisDateModal(item) {
      $("#thisDateModal").modal("show");
      this.tempProduct = Object.assign({}, item);
    },
  },
  created() {
    this.setToday();
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
  padding: 12px;
  margin: 1px;
}
.thisModelIn {
  padding: 10px;
  margin: 1px;
}
</style>