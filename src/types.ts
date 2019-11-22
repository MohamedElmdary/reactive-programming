import { Observable } from './observable';

type NextFn<T> = (value: T) => void;
type VoidFn = () => void;

interface Subscribe<T> {
    next: NextFn<T>;
    error?: (error: any) => void;
    complete?: VoidFn;
}

interface Subscription {
    unsubscribe: VoidFn;
}

type Operator<T> = (observable: Observable<T>) => Observable<T>;

export { Subscribe, Subscription, NextFn, VoidFn, Operator };
