import { Injectable } from '@angular/core';

import Chart from 'chart.js'

@Injectable()
export class ChartService {
  // http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
  colours = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']
  max = 10
  min = 1
  type = 'horizontalBar'

  constructor() { }

  private getRemainingColours(chart) {
    const currentColours = chart.data.datasets[0].backgroundColor
    return this.colours.filter(colour => {
      return currentColours.indexOf(colour) < 0
    })
  }

  setMinMax(min: number, max: number): void {
    if (min > max || max < 1 || min < 1) {
      return
    }
    this.min = min
    this.max = max
  }

  setType(type: string): void {
    this.type = type
  }

  makeChart(ctx, data, labels): Chart {
    const config: { [key: string]: any } = {
      type: this.type,
      data: {
        datasets: [{
            data: data,
            backgroundColor: this.colours.slice(0, data.length)
        }],
        labels: labels
      }
    }
    config.options = {
      scales: {
        xAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      }
    }

    return new Chart(ctx, config)
  }

  increment(chart: Chart, i: number): void {
    chart.data.datasets[0].data[i]++
    chart.update()
  }

  decrement(chart: Chart, i: number): void {
    chart.data.datasets[0].data[i] += chart.data.datasets[0].data[i] ? -1 : 0
    chart.update()
  }

  addOption(chart: Chart, option: string, votes?: number): void {
    if (chart.data.labels.length >= this.max) {
      return
    }
    chart.data.labels.push(option)
    chart.data.datasets[0].data.push(votes || 0)
    const n = chart.data.datasets[0].data.length
    // chart.data.datasets[0].backgroundColor = this.colours.slice(0, n)
    const availableColours = this.getRemainingColours(chart)
    chart.data.datasets[0].backgroundColor.push(availableColours[0])
    chart.update()
  }

  removeOption(chart: Chart, i: number): void {
    if (chart.data.labels.length < this.min) {
      return
    }
    // let j
    // const prunedLabels = chart.data.labels.filter((label, index) => {
    //   if (label === option) {
    //     j = index
    //     return false
    //   }
    //   return true
    // })
    // chart.data.labels = prunedLabels
    chart.data.labels.splice(i, 1)
    chart.data.datasets[0].data.splice(i, 1)
    const n = chart.data.datasets[0].data.length
    // chart.data.datasets[0].backgroundColor = this.colours.slice(0, n)
    chart.data.datasets[0].backgroundColor.splice(i, 1)
    chart.update()
  }

}
