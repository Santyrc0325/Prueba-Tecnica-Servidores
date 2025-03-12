import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServersComponent } from './pages/servers/servers.component';
import { AddServerComponent } from './pages/add-server/add-server.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'servers', component: ServersComponent, canActivate: [AuthGuard] },
  { path: 'add-server', component: AddServerComponent, canActivate: [AuthGuard] },
  { path: 'edit-server/:id', component: AddServerComponent, canActivate: [AuthGuard] } // ✅ Nueva ruta para editar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
