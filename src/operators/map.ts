import { Operator, Observable } from '../index';

function map<T, R>(fn: (v: T) => R): Operator<T, R> {
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
