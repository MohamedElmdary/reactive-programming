import { from } from '../../src/index';

console.log('reactive programming');

const obs = from(fetch('https://jsonplaceholder.typicode.com/users/1'));

obs.subscribe(v => console.log(v));
