import { Observable, nullFn } from '../index';

function from<T>(value: Array<T> | Promise<T> | T): Observable<T> {
    return new Observable(({ next, complete, error }) => {
        if (Array.isArray(value)) {
            value.forEach(next);
            complete();
            return {
                unsubscribe: nullFn
            }; // sync observable cannot be stopped
        }

        if (value instanceof Promise) {
            let notSubscribed = true;
            value
                .then(res => {
                    if (notSubscribed) {
                        next(res);
                        complete();
                    }
                })
                .catch(err => {
                    if (notSubscribed) {
                        error(err);
                    }
                });
            return {
                unsubscribe: () => {
                    // just prevent notify user because promised cannot be canceled
                    notSubscribed = false;
                }
            };
        }

        // no error can happen
        next(value);
        complete();
        return {
            unsubscribe: nullFn
        }; // sync observable cannot be stopped
    });
}

export { from };
