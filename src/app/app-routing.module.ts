import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { TarefasComponent } from './tarefas/tarefas.component';

const routes: Routes = [
  {path:'Cadastro', component: CadastroPessoaComponent },
  {path: 'Tarefas', component: TarefasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
