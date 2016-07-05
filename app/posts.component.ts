import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    template: `
        <h1>Posts</h1>
    `,
    directives: [RouterLink]
})
export class PostsComponent{
}