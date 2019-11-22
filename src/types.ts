interface Subscribe<T> {
    next: (value: T) => void;
    error?: (error: Error) => void;
    complete?: () => void;
}

interface Subscription {
    unsubscribe: () => void;
}

export { Subscribe, Subscription };
