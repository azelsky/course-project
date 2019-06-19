import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import {PlungerWeightService} from '../../shared/services/plunger-weight.service';
import {ChartOptions} from 'chart.js';
import {MatDialog} from '@angular/material';

import {InfoModalComponent} from '../../shared/components/info-modal/info-modal.component';

@Component({
  selector: 'app-plunger-weight',
  templateUrl: './plunger-weight.component.html',
  styleUrls: ['./plunger-weight.component.scss']
})
export class PlungerWeightComponent implements OnInit {
  public formulaData = [
    {name: 'D', description: 'діаметр прохідного січення труб ліфтової колони'},
    {name: 'd', description: 'діаметр рухомого елемента'},
    {name: 'ν', description: 'швидність підйома плунжера'},
    {name: 'B', description: 'комплексний параметр газа'},
    {name: 'm', description: 'маса плунжера'},
    {name: 'ξ', description: 'коефіцієнт гідравлічного опору плунжера'},
    {name: 'g', description: 'прискорення вільного падіння'},
    {name: 'Q', description: 'дебіт газа в стандартних умовах'},
    {name: 'ρc', description: 'плотність газу'},
  ];
  public diameter = 310;
  public diameterMovableObject = 132;
  public minSpeed = 0.1;
  public maxSpeed = 6;
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


  constructor(
    private service: PlungerWeightService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.weightCalculation();
  }

  transformToMeter(num: number): number {
    return num / 1000;
  }

  resetChart(): void {
    this.lineChartData.data = [];
    this.lineChartLabels = [];
  }

  weightCalculation(): void {
    this.resetChart();
    const V1 = this.minSpeed;
    const V2 = this.maxSpeed;
    const step = 0.3;
    const di = this.transformToMeter(this.diameterMovableObject);
    const D = this.transformToMeter(this.diameter);
    const pi = Math.PI;
    const g = 9.8;
    const z = 0.68;
    const Q = 2.367;
    const B = 0.245;
    const p = 980;
    let K1 = V1;
    while (K1 < V2) {
      const N1 = pi / 8;
      const N2 = Math.pow(D, 2);
      const N3 = Math.pow(di, 2);
      const D1 = N2 * N3 * N2;
      const D2 = N2 - N3;
      const Dem = D1 / Math.pow(D2, 2);
      const N6 = Math.pow(B, 2);
      const Q1 = (p * z) / (g * N6);
      const W = (4 * N6 * Q) / (pi * D * D);
      const m = N1 * Dem * Q1 * (W - K1) * (W - K1);
      this.lineChartLabels.push(K1.toFixed(2).toString());
      this.lineChartData.data.push(m.toFixed(2));
      K1 += step;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '50vw',
      data: {
        title: 'Розділ для розрахунку маси плунжера',
        img: 'pw.png',
        formulaData: this.formulaData
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
