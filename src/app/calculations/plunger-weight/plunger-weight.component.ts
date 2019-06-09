import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import {PlungerWeightService} from '../../shared/services/plunger-weight.service';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-plunger-weight',
  templateUrl: './plunger-weight.component.html',
  styleUrls: ['./plunger-weight.component.scss']
})
export class PlungerWeightComponent implements OnInit {

  public lineChartData = { data: [], label: 'Series A' };
  public lineChartLabels: Label[] = [].reverse();
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'м/с'
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'кг'
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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
    private service: PlungerWeightService
  ) { }

  ngOnInit() {
    this.weightCalculation();
  }

  weightCalculation(): void {
    const V1 = 0.1;
    const V2 = 6;
    const step = 0.7;
    const di = 0.132;
    const D = 0.310;
    const pi = Math.PI;
    let K1 = V1;
    while (K1 < V2) {
      const N1 = pi / 8;
      const N2 = Math.pow(D, 2);
      const N3 = Math.pow(di, 2);
      const B = 0.245;
      const p = 980;
      const D1 = N2 * N3 * N2;
      const D2 = N2 - N3;
      const Dem = D1 / Math.pow(D2, 2);
      const N6 = Math.pow(B, 2);
      const g = 9.8;
      const z = 0.68;
      const Q = 2.367;
      const Q1 = (p * z) / (g * N6);
      const W = (4 * N6 * Q) / (pi * D * D);
      const m = N1 * Dem * Q1 * (W - K1) * (W - K1);
      this.lineChartLabels.push(K1.toFixed(2).toString());
      this.lineChartData.data.push(m.toFixed(2));
      K1 += step;
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
