import {NgModule} from '@angular/core';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['topics']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'topics',
    loadChildren: () => import('./Pages/topics/topics.module').then(m => m.TopicPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'topic/:id',
    loadChildren: () => import('./post-page/post-page.module').then(m => m.PostPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
  // ,{
  //   path: 'test',
  //   loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
