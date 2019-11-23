import { from, map, filter, fromEvent } from '../../src/index';

console.log('reactive programming');

from([1, 2, 3, 4])
    .pipe(
        // \n
        map(v => v * 5 + 7)
    )
    .toPromise()
    .then(v => {
        console.log(v);
    })
    .catch(err => {
        console.error(err);
    });

/* const btn = document.getElementById('btn');

fromEvent(btn, 'click')
    .pipe(
        map(v => {
            return v.pageX;
        }),
        map(v => {
            return v.toFixed(2);
        })
    )
    .subscribe(v => {
        console.log(v);
    }); */

/*
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
*/
