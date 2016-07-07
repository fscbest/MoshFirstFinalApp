import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {HomeComponent} from './home.component';
import {NavBarComponent} from './navbar.component';
import {NotFoundComponent} from './not-found.component';
import {PostsComponent} from './posts/posts.component';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './users/user-form.component';


@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/posts', name: 'Posts', component: PostsComponent },
    { path: '/users/new', name: 'NewUser', component: UserFormComponent },
    { path: '/users/:id', name: 'EditUser', component: UserFormComponent },
    { path: '/not-found', name: 'NotFound', component: NotFoundComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.template.html',
    directives: [ROUTER_DIRECTIVES, NavBarComponent]
})
export class AppComponent {
}
