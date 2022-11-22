import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { NameInputComponent } from './components/name-input/name-input.component';
import { AuthGuard } from './security/auth.guard';
import { Auth2Guard } from './security/auth2.guard';

const routes: Routes = [
  {path:'', component: NameInputComponent},
  {path:'play', component: MainComponent, canActivate: [AuthGuard]},
  {path:'**', component: NameInputComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
