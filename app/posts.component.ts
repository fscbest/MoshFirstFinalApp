import {Component, OnInit} from 'angular2/core';

import {SpinnerComponent} from './spinner.component';

import {PostsService} from './posts.service';


@Component({
    templateUrl: '/app/posts.template.html',
    providers: [PostsService],
    directives: [SpinnerComponent],
    styles: [`
        .posts	li	{	cursor:	default;	}
        .posts	li:hover	{	background:	#ecf0f1;	}
        .list-group-item.active,
        .list-group-item.active:hover,
        .list-group-item.active:focus	{
             background-color:	#ecf0f1;
             border-color:	#ecf0f1;
             color:	#2c3e50;
        }
    `]
})
export class PostsComponent implements OnInit {
    posts:any[];
    currentPost;
    isLoading = true;
    isCommentsLoading = true;

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

    select(post){
        this.currentPost = post;
        this.isCommentsLoading = true;
        this._postsService.getComments(post.id)
            .subscribe(
                comments => this.currentPost.comments = comments,
                null,
                () => { this.isCommentsLoading = false;}
            );
    }
}