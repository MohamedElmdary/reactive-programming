import { Observable, Operator } from '../index';

function filter<T>(fn: (v: T) => boolean): Operator<T> {
    return observable => {
        return new Observable(({ next, error, complete }) => {
            return observable.subscribe(
                val => {
                    if (fn(val)) {
                        next(val);
                    }
                },
                error,
                complete
            );
        });
    };
}

export { filter };
