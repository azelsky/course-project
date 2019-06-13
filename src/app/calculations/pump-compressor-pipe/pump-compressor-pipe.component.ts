import {Component, OnInit} from '@angular/core';
import {Label} from 'ng2-charts';
import {PlungerWeightService} from '../../shared/services/plunger-weight.service';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-pump-compressor-pipe',
  templateUrl: './pump-compressor-pipe.component.html',
  styleUrls: ['./pump-compressor-pipe.component.scss']
})
export class PumpCompressorPipeComponent implements OnInit {

  public lineChartData = { data: [], label: 'Series A' };
  public lineChartLabels: Label[] = [];
  public pressureStart = 6;
  public pressureEnd =  20;
  public De = 128;
  public pipeThickness = 10;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'в.о.'
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'МПа'
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  constructor(
    private service: PlungerWeightService
  ) { }

  ngOnInit() {
    this.strengthPipeCalculation();
  }

  transformToMeter(num: number): number {
    return num / 1000;
  }

  setDi(): number {
    const De = this.transformToMeter(this.De);
    const pipeThickness = this.transformToMeter(this.pipeThickness);
    return De - 2 * pipeThickness;
  }

  resetChart(): void {
    this.lineChartData.data = [];
    this.lineChartLabels = [];
  }

  equivalentStretch(pressure: number): number {
    const Di = this.setDi();
    const De = this.transformToMeter(this.De);

    return 2 * (pressure * Math.pow(De, 2)) / (Math.pow(De, 2) - Math.pow(Di, 2));
  }

  safetyStretch(equivalentStretch: number) {
    return 120 / equivalentStretch;
  }

  strengthPipeCalculation(): void {
    this.resetChart();
    for (let pressure = this.pressureStart; pressure <= this.pressureEnd; pressure++) {
      this.lineChartData.data.push(pressure);
      const equivalentStretch = this.equivalentStretch(pressure);
      const safetyStretch = this.safetyStretch(equivalentStretch).toFixed(2).toString();
      this.lineChartLabels.push(safetyStretch);
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
