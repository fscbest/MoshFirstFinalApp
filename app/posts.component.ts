import {Component, OnInit} from 'angular2/core';

import {SpinnerComponent} from './spinner.component';

import {PostsService} from './posts.service';
import {UsersService} from './users.service';


@Component({
    templateUrl: '/app/posts.template.html',
    providers: [PostsService, UsersService],
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
    posts = [];
    users = [];
    currentPost;
    isPostsLoading = true;
    isCommentsLoading = true;

    constructor(
        private _postsService:PostsService,
        private _userService: UsersService) {

    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    loadUsers(){
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    loadPosts(filter?){
        this.isPostsLoading = true;

        this._postsService.getPosts(filter)
            .subscribe(
                posts => this.posts = posts,
                null,
                () => {
                    this.isPostsLoading = false;
                });
    }

    reloadPosts(filter){
        this.currentPost = null;

        this.loadPosts(filter);
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