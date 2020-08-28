import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { GetEmpresaPipe } from './get-empresa.pipe';
import { GetPerfilPipe } from './get-perfil.pipe';
import { TruncatePipe } from './truncate.pipe';
import { DiasFaltantesPipe } from './dias-faltantes.pipe';
import { ToDateLongPipe } from './to-date-long.pipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe,
  GetEmpresaPipe,
  GetPerfilPipe,
  TruncatePipe,
  DiasFaltantesPipe,
  ToDateLongPipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}