import { Operator, Observable } from '../index';

function map<T>(fn: (v: T) => T): Operator<T> {
    return observable => {
        return new Observable(({ next, error, complete }) => {
            return observable.subscribe(
                val => {
                    next(fn(val));
                },
                error,
                complete
            );
        });
    };
}

export { map };
