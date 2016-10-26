import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogpostCreateComponent } from './blogpost/blogpost.create.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: BlogpostCreateComponent },
  { path: ':path', component: BlogpostComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
