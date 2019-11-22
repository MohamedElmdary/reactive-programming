const nullFn = () => null;

function isFn(fn: any): fn is Function {
    return typeof fn === 'function';
}

export { nullFn, isFn };
