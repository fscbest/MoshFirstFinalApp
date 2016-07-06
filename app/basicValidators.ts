import {Control} from "angular2/common";
import {ControlGroup} from "angular2/common";
export class BasicValidators{
    static emailValidator(control: Control){
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        var valid =  ((control.value != "") && (control.value.length <= 5));
        valid = EMAIL_REGEXP.test(control.value);

        return valid ? null : {emailValidator: true};
    }

}