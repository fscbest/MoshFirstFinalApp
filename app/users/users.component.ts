import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {UsersService} from './users.service';

@Component({
    templateUrl: '/app/users/users.template.html',
    providers: [UsersService],
    directives: [RouterLink]
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

    deleteUser(user){
		if (confirm("Are you sure you want to delete " + user.name + "?")) {
			var index = this.users.indexOf(user)
			// Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

			this._usersService.deleteUser(user.id)
				.subscribe(null,
					err => {
						alert("Could not delete the user.");
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
						this.users.splice(index, 0, user);
					});
		}
	}
}