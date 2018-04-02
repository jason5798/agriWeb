<template>
  <v-layout row wrap>
    <v-flex md12>
      <div>
        <bar-chart :data="lineData" :options="{ maintainAspectRatio: false }"/>
      </div>
      <div class="col-md-8 chart-view">
        <daily-income :chart-data="lineData" :options="{ maintainAspectRatio: false }"/>
      </div>
    </v-flex>
    <v-flex xs6 v-for="i in 2" :key="`6${i}`">
      <v-card dark color="secondary">
        <v-card-text class="px-0">6</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import BarChart from '~/components/charts/bar-chart'
  import DailyIncome from '~/components/charts/DailyIncome'
  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'black'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'black'
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 5
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  }
  export default {
    layout: 'post',
    components: {
      BarChart,
      DailyIncome
    },
    async asyncData ({ app, params, store, isServer, error }) {
      try {
        console.log('********************************')
        console.log(isServer)
        console.log(store)
        console.log(params)
        const { data } = await app.$axios.get(`todos/bindlist`)

        return {
          newList: data,
          lineData: {
            labels: ['0', '', '', '', '', '', '12'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: '#c2c2d6',
                borderColor: 'rgba(255,255,255,.55)',
                data: [65, 59, 84, 84, 51, 55, 40]
              }
            ]
          },
          myoptions: options
        }
      } catch (err) {
        error('活動不存在')
      }
    }
  }
</script>
