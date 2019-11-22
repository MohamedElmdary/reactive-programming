import { Observable, nullFn } from '../index';

function of<T>(...values: T[]): Observable<T> {
    // this function cannot throw error
    return new Observable<T>(({ next, error, complete }) => {
        values.forEach(next);
        complete();
        return nullFn; // sync observable cannot be stopped
    });
}

export { of };
