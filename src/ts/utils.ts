type Func<T extends any[], R> = (...args: T) => R;

export const throttle = <T extends any[], R>(func: Func<T, R>, ms: number) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), ms);
    };
};