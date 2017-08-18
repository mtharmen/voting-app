import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core'

import { ChartService } from './chart.service'

@Component({
  selector: 'app-secret',
  template: `
    <h1>{{message}}</h1>
    <div style="width: 500px; height: 500px"><canvas #pieChart width="400" height="400"></canvas></div>
    <button class="btn btn-primary" (click)="addData()" >Add</button>
    <button class="btn btn-primary" (click)="removeData()" >Remove</button>
    <button class="btn btn-primary" (click)="increment()" >++</button>
    <button class="btn btn-primary" (click)="decrement()" >--</button>
  `,
  styles: []
})
export class SecretComponent implements AfterViewInit {

  @ViewChild('pieChart') chart: ElementRef
  pieChart: any
  config: any

  // http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
  colours = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']
  message = 'Secret Stuff'

  constructor(private cs: ChartService) { }

  ngAfterViewInit(): void {
    this.makeChart()
  }

  makeChart(): void {
    const ctx = this.chart.nativeElement.getContext('2d')
    const data = [5, 4, 2, 4, 7]
    const labels = ['Light Blue', 'Blue', 'Light Green', 'Green', 'Pink']
    this.pieChart = this.cs.makeChart(ctx, data, labels)
  }

  addData(): void {
    const option = `Label Test`
    const vote = Math.floor(Math.random() * 10)
    this.cs.addOption(this.pieChart, option, vote)
  }

  removeData(i?: number): void {
    const n = this.pieChart.data.datasets[0].data.length
    const j = Math.floor(Math.random() * n)

    this.cs.removeOption(this.pieChart, j)
  }

  increment(i?: number): void {
    const n = this.pieChart.data.datasets[0].data.length
    const j = Math.floor(Math.random() * n)

    this.cs.increment(this.pieChart, j)
  }

  decrement(i?: number) {
    const n = this.pieChart.data.datasets[0].data.length
    const j = Math.floor(Math.random() * n)

    this.cs.decrement(this.pieChart, j)
  }

}
