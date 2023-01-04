import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';

const routes: Routes = [
  {path:'', component: CadastroPessoaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
