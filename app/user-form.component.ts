import {Component, OnInit} from 'angular2/core';
import {ControlGroup, FormBuilder} from 'angular2/common';
import {Validators} from 'angular2/common';

import {BasicValidators} from './basicValidators';


@Component({
    templateUrl: '/app/user-form.template.html'
})
export class UserFormComponent implements OnInit{
    form: ControlGroup;

    constructor(private _fb: FormBuilder) {

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
}