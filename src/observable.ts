import { Subscribe, Subscription, NextFn, VoidFn, nullFn, isFn } from './index';
import { Operator } from './types';

class Observable<T> {
    public constructor(
        private readonly _subscribe: (
            observer: Subscribe<T>
        ) => Subscription | VoidFn
    ) {}

    public subscribe(
        observer: Subscribe<T> | NextFn<T>,
        error?: (error: any) => void,
        complete?: VoidFn
    ): Subscription {
        const subscription = this._subscribe({
            next: isFn(observer) ? observer : observer.next,
            error: (isFn(observer) ? error : observer.error) || nullFn,
            complete: (isFn(observer) ? complete : observer.complete) || nullFn
        });
        return isFn(subscription)
            ? { unsubscribe: subscription }
            : subscription;
    }

    public pipe(...operators: Operator<T>[]): Observable<T> {
        let currentObservable: Observable<T> = this;
        operators.forEach(operator => {
            currentObservable = operator(currentObservable);
        });
        return currentObservable;
    }
}

export { Observable };
