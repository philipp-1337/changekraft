import { UntypedFormControl } from '@angular/forms';


export function matchOtherValidator(otherControlName: string) {

    let thisControl: UntypedFormControl;
    let otherControl: UntypedFormControl;

    return function matchOtherValidator(control: UntypedFormControl) {

        if (!control.parent) {
            return null;
        }

        // Initializing the validator.
        if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName) as UntypedFormControl;
            if (!otherControl) {
                throw new Error('matchOtherValidator(): other control is not found in parent group');
            }
            if (!thisControl['subscribed']) {
                thisControl['subscribed'] = true;
                otherControl.valueChanges.subscribe(() => {
                    thisControl.updateValueAndValidity();
                });
            }
        }

        if (!otherControl) {
            return null;
        }

        if (otherControl.value !== thisControl.value) {
            return {
                matchOther: true
            };
        }

        return null;

    }

}