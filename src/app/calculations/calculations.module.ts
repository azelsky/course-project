import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationsComponent } from './calculations.component';
import {CalculationsRoutingModule} from './calculations-routing.module';
import { PlungerWeightComponent } from './plunger-weight/plunger-weight.component';
import { PumpCompressorPipeComponent } from './pump-compressor-pipe/pump-compressor-pipe.component';
import {ChartsModule} from 'ng2-charts';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CalculationsComponent, PlungerWeightComponent, PumpCompressorPipeComponent],
  imports: [
    CommonModule,
    CalculationsRoutingModule,
    ChartsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [],
})
export class CalculationsModule { }
