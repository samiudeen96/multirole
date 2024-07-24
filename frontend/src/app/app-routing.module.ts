import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication/authentication.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
