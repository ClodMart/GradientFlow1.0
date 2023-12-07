import { SearchComponent } from './Pages/search/search.component';
import { LoginComponent } from './Pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AiChatPageComponent } from './Pages/IAChat/aiChat-page.component';
import { AuthGuard } from './Services/auth.service';
import { LogoutComponent } from './Pages/logout/logout.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { NavigationUtils } from './Classes/navigation-classes'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent },
  { path: 'app', canActivate: [AuthGuard], component: LayoutComponent,
    children: [
      { path: '', canActivate: [AuthGuard], component: HomePageComponent },
      { path: 'search', canActivate: [AuthGuard], component: SearchComponent},
      { path: 'home', canActivate: [AuthGuard], component: HomePageComponent },
      { path: 'Ai chat', canActivate: [AuthGuard], component: AiChatPageComponent }
    ]
  },
];

const icons: NavigationUtils.Icons= [
  {path: 'home', icon:'home'},
  {path: 'Ai chat', icon:'swap_horizontal_circle'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public getRoutes(path: string): Array<NavigationUtils.NavigationItem>{
    const exroutes= new Array<NavigationUtils.NavigationItem>;
    routes.forEach(x=> {
      if(x.path === path){
        if(x.children){
            let i = 0;
            x.children.forEach(y => {
              if(y.path !="" && y.path != "search"){
                exroutes.push(new NavigationUtils.NavigationItem(y.path?.toUpperCase() ?? "", i, y.path ?? "", icons.find(z=>z.path == y.path)?.icon ));
              }
            i++;
          });
        }
      }});
  return exroutes;
  }
}

