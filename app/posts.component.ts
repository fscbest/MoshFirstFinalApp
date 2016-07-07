import {Component, OnInit} from 'angular2/core';
import {PostsService} from './posts.service';

@Component({
    templateUrl: '/app/posts.template.html',
    providers: [PostsService]
})
export class PostsComponent implements OnInit{
    posts: any[];

    constructor(private _postsService: PostsService){

    }

    ngOnInit(){
        this._postsService.getPosts()
            .subscribe(posts => {
                this.posts = posts;
            });
    }
}