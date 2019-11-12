import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { GetEmpresaPipe } from './get-empresa.pipe';
import { GetPerfilPipe } from './get-perfil.pipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe,
  GetEmpresaPipe,
  GetPerfilPipe
]

@NgModule({
  imports: [
  CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}