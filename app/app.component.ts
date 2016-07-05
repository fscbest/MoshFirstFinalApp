import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home.component';
import {NavBarComponent} from './navbar.component';
import {PostsComponent} from './posts.component';
import {UsersComponent} from './users.component';


@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/posts', name: 'Posts', component: PostsComponent },
    //{ path: '/archives/:year/:month', name: 'Archives', component: ArchivesComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.template.html',
    directives: [ROUTER_DIRECTIVES, NavBarComponent, PostsComponent, UsersComponent]
})
export class AppComponent {
}
