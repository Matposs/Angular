import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { CadastroProfessorComponent } from './cadastro-professor/cadastro-professor.component';
import { TarefasComponent } from './tarefas/tarefas.component';

const routes: Routes = [
  {path:'Cadastro' || '/', component: CadastroPessoaComponent },
  {path: 'Tarefas', component: TarefasComponent},
  {path: 'Cadastro/Professor', component : CadastroProfessorComponent},
  {path: 'Cadastro/Aluno', component : CadastroAlunoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
