import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationsComponent } from './calculations.component';
import {CalculationsRoutingModule} from './calculations-routing.module';
import { PlungerWeightComponent } from './plunger-weight/plunger-weight.component';
import { PumpCompressorPipeComponent } from './pump-compressor-pipe/pump-compressor-pipe.component';
import {ChartsModule} from 'ng2-charts';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {InfoModalComponent} from '../shared/components/info-modal/info-modal.component';

@NgModule({
  declarations: [CalculationsComponent, PlungerWeightComponent, PumpCompressorPipeComponent, InfoModalComponent],
  imports: [
    CommonModule,
    CalculationsRoutingModule,
    ChartsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule
  ],
  entryComponents: [InfoModalComponent],
  exports: [],
})
export class CalculationsModule { }
