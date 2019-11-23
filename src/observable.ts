import {
    Subscribe,
    Subscription,
    NextFn,
    VoidFn,
    nullFn,
    isFn,
    take
} from './index';
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
    public pipe<A>(operator1: Operator<T, A>): Observable<A>;
    public pipe<A, B>(operator1: Operator<T, A>, operator2: Operator<A, B>): Observable<B>; // prettier-ignore
    public pipe<A, B, C>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>): Observable<C>; // prettier-ignore
    public pipe<A, B, C, D>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>): Observable<D>; // prettier-ignore
    public pipe<A, B, C, D, E>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>, operator5: Operator<D, E>): Observable<E>; // prettier-ignore
    public pipe<A, B, C, D, E, F>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>, operator5: Operator<D, E>, operator6: Operator<E, F>): Observable<F>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>, operator5: Operator<D, E>, operator6: Operator<E, F>, operator7: Operator<F, G>): Observable<G>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G, H>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>, operator5: Operator<D, E>, operator6: Operator<E, F>, operator7: Operator<F, G>, operator8: Operator<G, H>): Observable<H>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G, H, I>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>, operator5: Operator<D, E>, operator6: Operator<E, F>, operator7: Operator<F, G>, operator8: Operator<G, H>, operator9: Operator<H, I>): Observable<I>; // prettier-ignore
    public pipe<A, B, C, D, E, F, G, H, I>(operator1: Operator<T, A>, operator2: Operator<A, B>, operator3: Operator<B, C>, operator4: Operator<C, D>, operator5: Operator<D, E>, operator6: Operator<E, F>, operator7: Operator<F, G>, operator8: Operator<G, H>, operator9: Operator<H, I>, operator10: Operator<I, any>, ...operators: Array<Operator<any, any>>): Observable<any>; // prettier-ignore
    public pipe(...operators: Array<Operator<any, any>>): Observable<any> {
        let currentObservable: Observable<any> = this;
        operators.forEach(operator => {
            currentObservable = operator(currentObservable);
        });
        return currentObservable;
    }

    public toPromise(): Promise<T> {
        return new Promise<T>((res, rej) => {
            this.pipe(take(1)).subscribe(res, rej);
        });
    }
}

export { Observable };
