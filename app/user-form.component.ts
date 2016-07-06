import {CanDeactivate, Router, RouteParams} from "angular2/router";
import {Component, OnInit} from 'angular2/core';
import {ControlGroup, FormBuilder} from 'angular2/common';
import {Validators} from 'angular2/common';

import {BasicValidators} from './basicValidators';
import {User} from './user';
import {UsersService} from './users.service';



@Component({
    templateUrl: '/app/user-form.template.html',
	providers: [UsersService]

})
export class UserFormComponent implements OnInit, CanDeactivate{
    form: ControlGroup;
	title: String;
	user = new User(); //or user = { address: {} };

    constructor(private _fb: FormBuilder,
				private _router: Router,
				private _usersService: UsersService,
				private _routeParams: RouteParams) {
	}

	ngOnInit(){
		this.form = this._fb.group({
			name: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3)
			])],
			email: ['', Validators.compose([
				Validators.required,
				BasicValidators.emailValidator
			])],
			phone: [],
			address: this._fb.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});

		var id = this._routeParams.get("id");
		this.title = id ? "Edit User" : "New User";

		if (!id)
			return;

		this._usersService.getUser(id)
			.subscribe(
				user => this.user = user,
				response => {
					if (response.status == 404) {
						this._router.navigate(['NotFound']);
					}
				});
	}

	routerCanDeactivate(next, previous){
		if(this.form.dirty){
			return confirm("The form is changed. Are you sure?");
		}
		return true;
	}

	save(){
		var result;

		if (this.user.id)
			result = this._usersService.updateUser(this.user);
		else
			result = this._usersService.addUser(this.user);

		result.subscribe(x => {
			// Ideally, here we'd want:
			// this.form.markAsPristine();
			this._router.navigate(['Users']);
		});
	}
}