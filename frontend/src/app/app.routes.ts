import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { CreatePostComponent } from './blogpost/createpost.component';
import { PublishPostComponent } from './blogpost/blogpost.publish.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'publish', component: PublishPostComponent },
  { path: 'login', component: LoginComponent },
  { path: ':path', component: BlogpostComponent },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
