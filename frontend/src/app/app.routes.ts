import { Routes } from '@angular/router';
import { WrapperComponent } from './layouts/static/wrapper/wrapper.component';
import { HomeComponent } from './components/home/home.component';
import { AdminWrapperComponent } from './layouts/admin/admin-wrapper/admin-wrapper.component';
import { AboutComponent } from './components/admin/about/about.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './components/admin/admin-signup/admin-signup.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { ServicesComponent } from './components/admin/services/services.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { CustomerComponent } from './components/admin/customer/customer.component';
import { ExperienceComponent } from './components/admin/experience/experience.component';
import { ProfileEditComponent } from './components/admin/profile/profile-edit/profile-edit.component';
import { ProjectsAddComponent } from './components/admin/projects/projects-add/projects-add.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'admin-signup', component: AdminSignupComponent },
    {
        path:'', component:WrapperComponent,
        children:[
            {
                path:'home',component:HomeComponent
            }
        ]
    },
    {
        path:'admin',component:AdminWrapperComponent,
        children:[
            { path: 'profile', component: ProfileComponent },
            { path: 'profile/edit', component: ProfileEditComponent },
            { path:'profile',component:ProfileComponent },
            { path:'about',component:AboutComponent },
            { path:'experience',component:ExperienceComponent },
            { path:'customers',component:CustomerComponent },
            { path:'projects',component:ProjectsComponent },
            { path:'projects/add',component:ProjectsAddComponent },
            { path:'services',component:ServicesComponent },
        ]
    }
];
