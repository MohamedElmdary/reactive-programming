import { Operator, Observable } from '../index';

function delay<T>(time: number): Operator<T> {
    return observable => {
        return new Observable(({ next, error, complete }) => {
            let fired = false;
            const values = [];
            setTimeout(() => {
                fired = true;
                values.forEach(next);
            }, time);
            return observable.subscribe(
                val => {
                    if (fired) {
                        next(val);
                    } else {
                        values.push(val);
                    }
                },
                error,
                complete
            );
        });
    };
}

export { delay };
