import {Control} from "angular2/common";
import {ControlGroup} from "angular2/common";
export class BasicValidators{
    static emailValidator(control: Control){
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return {emailValidator: true};
        }

        return null;
    }

}