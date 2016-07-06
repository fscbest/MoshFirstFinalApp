import {CanDeactivate, Router} from "angular2/router";
import {Component, OnInit} from 'angular2/core';
import {ControlGroup, FormBuilder} from 'angular2/common';
import {Validators} from 'angular2/common';

import {BasicValidators} from './basicValidators';
import {UsersService} from './users.service';



@Component({
    templateUrl: '/app/user-form.template.html',
	providers: [UsersService]

})
export class UserFormComponent implements OnInit, CanDeactivate{
    form: ControlGroup;

    constructor(private _fb: FormBuilder, private _router: Router, private _usersService: UsersService) {

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
	}

	routerCanDeactivate(next, previous){
		if(this.form.dirty){
			return confirm("The form is changed. Are you sure?");
		}
		return true;
	}

	save(){
		this._usersService.addUser(this.form.value)
			.subscribe(x => {
				this._router.navigate(['Users']);
			});
	}
}