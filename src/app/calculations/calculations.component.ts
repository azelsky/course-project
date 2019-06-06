import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  selectedSection = 'Сalculation of Pump-Compressor Pipe';
  constructor() { }

  ngOnInit() {
  }

}
