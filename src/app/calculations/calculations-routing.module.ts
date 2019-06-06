import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalculationsComponent} from './calculations.component';
import {PlungerWeightComponent} from './plunger-weight/plunger-weight.component';
import {PumpCompressorPipeComponent} from './pump-compressor-pipe/pump-compressor-pipe.component';


const routes: Routes = [
  {path: '', component: CalculationsComponent, children: [
        { path: '', redirectTo: 'weight-plunger', pathMatch: 'full' },
        {path: 'weight-plunger', component: PlungerWeightComponent},
        {path: 'pump-compressor-pipe', component: PumpCompressorPipeComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculationsRoutingModule { }
