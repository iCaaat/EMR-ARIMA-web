<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import * as echarts from "echarts"


// 科室列表

const departmentList = ref([])

// 医生列表

const doctorList = ref([])

// 推荐排班

const scheduleList = ref([])


// 查询参数

const query = ref({

  departmentId:null,

  doctorId:null,

  days:7

})


// =========================
// 加载科室（真实接口）
// =========================

const loadDepartment = async () => {

  const res = await axios.get("/arima/department/list")

  departmentList.value = res.data

}



// =========================
// 加载医生（模拟数据）
// =========================

const loadDoctor = () => {

  doctorList.value = [

    {
      doctorId:1,
      realName:"张医生"
    },

    {
      doctorId:2,
      realName:"李医生"
    },

    {
      doctorId:3,
      realName:"王医生"
    }

  ]

}


// =========================
// 预测（模拟ARIMA数据）
// =========================

const predict = () => {

  // 模拟历史数据

  const history = [

    {date:"2025-01-01",count:120},
    {date:"2025-01-02",count:135},
    {date:"2025-01-03",count:140},
    {date:"2025-01-04",count:150},
    {date:"2025-01-05",count:160}

  ]


  // 模拟预测数据

  const predict = [

    {date:"2025-01-06",count:170},
    {date:"2025-01-07",count:180},
    {date:"2025-01-08",count:190}

  ]


  drawChart({

    history,

    predict

  })


  // 推荐排班

  scheduleList.value = predict.map(item => {

    return {

      date:item.date,

      recommendNumber:item.count

    }

  })

}


// =========================
// 画趋势图
// =========================

const drawChart = (data) => {

  const chart = echarts.init(

      document.getElementById("chart")

  )


  chart.setOption({

    tooltip:{},

    legend:{

      data:["历史","预测"]

    },

    xAxis:{

      type:"category",

      data:[

        ...data.history.map(i => i.date),

        ...data.predict.map(i => i.date)

      ]

    },

    yAxis:{

      type:"value"

    },

    series:[

      {

        name:"历史",

        type:"line",

        data:data.history.map(i => i.count)

      },

      {

        name:"预测",

        type:"line",

        data:[

          ...new Array(data.history.length).fill(null),

          ...data.predict.map(i => i.count)

        ]

      }

    ]

  })

}


// =========================
// 生成排班（模拟）
// =========================

const createSchedule = (row) => {

  console.log("生成排班：",row)

}


onMounted(()=>{

  loadDepartment()

})
</script>

<template>
  <div class="container">

    <!-- 查询区域 -->

    <el-card>

      <template #header>
        <span>智能排班辅助（ARIMA）</span>
      </template>

      <el-form :inline="true">

        <!-- 科室选择 -->

        <el-form-item label="科室">

          <el-select
              v-model="query.departmentId"
              placeholder="选择科室"
              style="width:200px"
              @change="loadDoctor"
          >
            <el-option
                v-for="item in departmentList"
                :key="item.departmentId"
                :label="item.name"
                :value="item.departmentId"
            />

          </el-select>

        </el-form-item>


        <!-- 医生选择 -->

        <el-form-item label="医生">

          <el-select
              v-model="query.doctorId"
              placeholder="选择医生"
              style="width:200px"
          >

            <el-option
                v-for="item in doctorList"
                :key="item.doctorId"
                :label="item.realName"
                :value="item.doctorId"
            />

          </el-select>

        </el-form-item>


        <!-- 预测天数 -->

        <el-form-item label="预测天数">

          <el-input-number
              v-model="query.days"
              :min="1"
              :max="30"
          />

        </el-form-item>


        <el-form-item>

          <el-button
              type="primary"
              @click="predict"
          >
            开始预测
          </el-button>

        </el-form-item>

      </el-form>

    </el-card>


    <!-- 趋势图 -->

    <el-card style="margin-top:20px">

      <template #header>
        <span>挂号趋势预测</span>
      </template>

      <div
          id="chart"
          style="height:400px"
      ></div>

    </el-card>


    <!-- 推荐排班表 -->

    <el-card style="margin-top:20px">

      <template #header>
        <span>推荐排班</span>
      </template>

      <el-table
          :data="scheduleList"
          border
          style="width:100%"
      >

        <el-table-column
            prop="date"
            label="日期"
        />

        <el-table-column
            prop="recommendNumber"
            label="推荐号源"
        />

        <el-table-column
            label="操作"
        >

          <template #default="scope">

            <el-button
                type="success"
                size="small"
                @click="createSchedule(scope.row)"
            >
              生成排班
            </el-button>

          </template>

        </el-table-column>

      </el-table>

    </el-card>


  </div>
</template>

<style scoped>
.container{
  padding:20px;
}
</style>