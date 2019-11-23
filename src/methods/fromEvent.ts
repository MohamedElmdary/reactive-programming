import { Observable } from '../index';

function fromEvent<T extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: T
): Observable<HTMLElementEventMap[T]> {
    return new Observable<HTMLElementEventMap[T]>(
        ({ next, error, complete }) => {
            element.addEventListener(event, next);
            return () => {
                element.removeEventListener(event, next);
            };
        }
    );
}

export { fromEvent };
