import {Component} from 'angular2/core';
import {ControlGroup, FormBuilder} from 'angular2/common';
import {Validators} from 'angular2/common';

import {BasicValidators} from './basicValidators';


@Component({
    templateUrl: '/app/user-form.template.html'
})
export class UserFormComponent{
    form: ControlGroup;

    constructor(fb: FormBuilder) {
		this.form = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.compose([
				Validators.required,
				BasicValidators.emailValidator
			])],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});
	}
}