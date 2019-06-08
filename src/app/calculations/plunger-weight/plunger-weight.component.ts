import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import {PlungerWeightService} from '../../shared/services/plunger-weight.service';

@Component({
  selector: 'app-plunger-weight',
  templateUrl: './plunger-weight.component.html',
  styleUrls: ['./plunger-weight.component.scss']
})
export class PlungerWeightComponent implements OnInit {

  public lineChartData = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['6', '5', '3.75', '3.16', '3', '2.31', '2', '0.75'] .reverse();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
    private service: PlungerWeightService
  ) { }

  ngOnInit() {
    this.weightCalculation();
  }

  weightCalculation(): void {
    const v = [6, 5, 3.75, 3.16, 3, 2.31, 2, 0.75];
    let res = 0;
    const d = 300;
    const D = 310;
    const g = 9.8;
    const B = [0.245, 0.247, 0.251, 0.258, 0.262, 0.266, 0.27, 0.277];
    const Q = [2.367, 2.22, 1.985, 1.787, 1.6, 1.416, 1.244, 0.909];
    const pressure = 0.1013;
    const coefficientOfHydraulicResistance = 0.012;
    for (let i = 0; i < 8; i++) {
      res = (Math.PI / 8) *
        (
          Math.pow(d, 2) * Math.pow(D, 2) / Math.pow(
            ((Math.pow(D, 2) - (Math.pow(d, 2))))
            , 2)
        ) *
        (coefficientOfHydraulicResistance * pressure / g * Math.pow(B[i], 2)) *
        Math.pow(
          (4 * Math.pow(B[i], 2) * Q[i] / Math.PI * Math.pow(D, 2)) - v[i]
          , 2);
      this.lineChartData[0].data.push(res);
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
