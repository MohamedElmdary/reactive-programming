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

    public pipe(): Observable<T>;
    public pipe<A>(fn1: Operator<T, A>): Observable<A>;
    public pipe<A, B>(fn1: Operator<T, A>, fn2: Operator<A, B>): Observable<B>;
    public pipe<A, B, C>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>): Observable<C>; // prettier-ignore
    public pipe<A, B, C, D>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>): Observable<D>; // prettier-ignore
    public pipe<A, B, C, D, E>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>, fn5: Operator<D, E>): Observable<E>; // prettier-ignore
    public pipe<A, B, C, D, E, F>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>, fn5: Operator<D, E>, fn6: Operator<E, F>): Observable<F>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>, fn5: Operator<D, E>, fn6: Operator<E, F>, fn7: Operator<F, G>): Observable<G>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G, H>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>, fn5: Operator<D, E>, fn6: Operator<E, F>, fn7: Operator<F, G>, fn8: Operator<G, H>): Observable<H>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G, H, I>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>, fn5: Operator<D, E>, fn6: Operator<E, F>, fn7: Operator<F, G>, fn8: Operator<G, H>, fn9: Operator<H, I>): Observable<I>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G, H, I>(fn1: Operator<T, A>, fn2: Operator<A, B>, fn3: Operator<B, C>, fn4: Operator<C, D>, fn5: Operator<D, E>, fn6: Operator<E, F>, fn7: Operator<F, G>, fn8: Operator<G, H>, fn9: Operator<H, I>, fn10: Operator<I, any>, ...fns: Array<Operator<any, any>>): Observable<any>; // prettier-ignore
    public pipe(...operators: Array<Operator<any, any>>): Observable<any> {
        let currentObservable: Observable<any> = this;
        operators.forEach(operator => {
            currentObservable = operator(currentObservable);
        });
        return currentObservable;
    }
}

export { Observable };
