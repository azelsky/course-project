import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationsComponent } from './calculations.component';
import {CalculationsRoutingModule} from './calculations-routing.module';
import { PlungerWeightComponent } from './plunger-weight/plunger-weight.component';
import { PumpCompressorPipeComponent } from './pump-compressor-pipe/pump-compressor-pipe.component';

@NgModule({
  declarations: [CalculationsComponent, PlungerWeightComponent, PumpCompressorPipeComponent],
  imports: [
    CommonModule,
    CalculationsRoutingModule
  ]
})
export class CalculationsModule { }
