import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { PostDetail } from '../pages/postDetail/post-detail.component';
import { StoresPosts } from '../pages/storesPosts/stores-posts.component';
import { UtilService, AuthService, WpService } from '../services/index';
import { LoginFormComponent } from '../components/loginForm/loginForm.component';
import { CommentsListComponent } from '../components/commentsList/commentsList.component';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => localStorage.getItem('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    Home,
    PostDetail,
    StoresPosts,
    ProfilePage,
    LoginFormComponent,
    CommentsListComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    PostDetail,
    StoresPosts,
    ProfilePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilService,
    AuthService,
    WpService,
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] }
  ]
})
export class AppModule { }
