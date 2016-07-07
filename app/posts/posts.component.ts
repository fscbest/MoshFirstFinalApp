import {Component, OnInit} from '@angular/core';

import {SpinnerComponent} from '../shared/spinner.component';

import {PaginationComponent} from '../shared/pagination.component';
import {PostsService} from './posts.service';
import {UsersService} from '../users/users.service';


@Component({
    templateUrl: '/app/posts/posts.template.html',
    providers: [PostsService, UsersService],
    directives: [SpinnerComponent, PaginationComponent],
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
    pagedPosts = [];
    currentPost;
    isPostsLoading = true;
    isCommentsLoading = true;
    pageSize = 10;

    constructor(private _postsService:PostsService,
                private _userService:UsersService) {

    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    private loadUsers() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    private loadPosts(filter?) {
        this.isPostsLoading = true;

        this._postsService.getPosts(filter)
            .subscribe(
                posts => {
                    this.posts = posts;
                        this.pagedPosts = _.take(this.posts, this.pageSize); //this.getPostsInPage(1);
                },
                null,
                () => {
                    this.isPostsLoading = false;
                });
    }

    reloadPosts(filter) {
        this.currentPost = null;

        this.loadPosts(filter);
    }

    select(post) {
        this.currentPost = post;
        this.isCommentsLoading = true;
        this._postsService.getComments(post.id)
            .subscribe(
                comments => this.currentPost.comments = comments,
                null,
                () => {
                    this.isCommentsLoading = false;
                }
            );
    }

    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;

        //this.pagedPosts = this.getPostsInPage(page);
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize)
    }

    //private getPostsInPage(page) {
    //    var result = [];
    //    var startingIndex = (page - 1) * this.pageSize;
    //    var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);
    //
    //    for (var i = startingIndex; i < endIndex; i++)
    //        result.push(this.posts[i]);
    //
    //    return result;
    //}
}