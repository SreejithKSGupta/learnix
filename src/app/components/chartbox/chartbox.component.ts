import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-chartbox',
  standalone: false,
  templateUrl: './chartbox.component.html',
  styleUrls: ['./chartbox.component.css']
})
export class ChartboxComponent implements OnInit, OnDestroy {
  @Input() chartdata!: any;
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance!: Chart;

  constructor() {}

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private initializeChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(this.chartCanvas.nativeElement, {
      type: this.chartdata.type as keyof ChartTypeRegistry,
      data: {
        labels: this.chartdata.labels,
        datasets: [{
          label: this.chartdata.heading,
          data: this.chartdata.values,
          backgroundColor: this.chartdata.color || this.chartdata.backgroundcolor,
          borderColor: this.chartdata.bordercolor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
