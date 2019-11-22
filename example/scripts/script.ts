import { from, map, filter } from '../../src/index';

console.log('reactive programming');

const values = [1, 2, 3, 4, 5, 6];
const $stream = from(values);

$stream
    // \n
    .pipe(
        map(v => {
            return v * 5;
        }),
        filter(v => !!(v % 3))
    )
    .subscribe({
        next(v) {
            console.log(v);
        },
        complete() {
            console.log('done');
        }
    });
