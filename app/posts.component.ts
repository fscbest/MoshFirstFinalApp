import {Component, OnInit} from 'angular2/core';

import {SpinnerComponent} from './spinner.component';

import {PostsService} from './posts.service';


@Component({
    templateUrl: '/app/posts.template.html',
    providers: [PostsService],
    directives: [SpinnerComponent]
})
export class PostsComponent implements OnInit {
    posts:any[];
    isLoading = true;

    constructor(private _postsService:PostsService) {

    }

    ngOnInit() {
        this._postsService.getPosts()
            .subscribe(
                posts => this.posts = posts,
                null,
                () => {
                    this.isLoading = false;
                });
    }
}