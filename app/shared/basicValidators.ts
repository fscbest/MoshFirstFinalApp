import {Control} from "angular2/common";
import {ControlGroup} from "angular2/common";
export class BasicValidators{
    static emailValidator(control: Control){
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var valid =  EMAIL_REGEXP.test(control.value);

        return valid ? null : {emailValidator: true};
    }

}