import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'navbar',
    templateUrl: '/app/navbar.template.html',
    directives: [RouterLink]
})
export class NavBarComponent {
}