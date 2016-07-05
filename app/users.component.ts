import {Component, OnInit} from 'angular2/core';

import {UsersService} from './users.service';

@Component({
    templateUrl: '/app/users.template.html',
    providers: [UsersService]
})
export class UsersComponent implements OnInit{
    users : any[];

    constructor(private _usersService: UsersService){

    }

    ngOnInit(){
        this._usersService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
}