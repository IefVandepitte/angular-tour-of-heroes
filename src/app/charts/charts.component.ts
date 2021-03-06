import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartData, Point } from "chart.js";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, AfterViewInit {

  canvas: any;
  ctx: any;
    ngAfterViewInit(): void {
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
            label: '# of Votes',
            data: [1, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false,
          display: true
        }
      });
    }

  constructor() { }

  ngOnInit() {
  }

}
