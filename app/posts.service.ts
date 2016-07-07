import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService{
    private _url = 'http://jsonplaceholder.typicode.com/posts';

    constructor(private _http: Http){
    }

    getPosts() {
        return this._http.get(this._url)
            .map(res => res.json());
    }

    addPost(post){
        return this._http.post(this._url, JSON.stringify(post))
            .map(res => res.json());
    }

    getPost(postId){
        return this._http.get(this.getPostUrl(postId))
            .map(res => res.json());
    }
    updatePost(post){
        return this._http.put(this.getPostUrl(post.id), JSON.stringify(post))
            .map(res => res.json());
    }

    deletePost(postId){
        return this._http.delete(this.getPostUrl(postId))
            .map(res => res.json());
    }

    private getPostUrl(postId){
        return this._url + "/" + postId;
    }
}