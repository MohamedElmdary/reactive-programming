import { Operator } from '../index';
import { Observable } from '../observable';

function take<T>(times: number): Operator<T> {
    return observable => {
        return new Observable(({ next, complete, error }) => {
            let counter = 0;
            if (times === 0) {
                error(new Error(`take operator require times parameter > 0`));
            }
            return observable.subscribe({
                next(v) {
                    if (times > counter++) {
                        next(v);
                    }

                    if (times === counter) {
                        complete();
                    }
                },
                error,
                complete
            });
        });
    };
}

export { take };
