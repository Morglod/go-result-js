export declare type ResultErr<ErrorT extends Error = Error> = ErrorT | true | undefined;
export declare type Result<T, ErrorT extends Error = Error> = [ResultErr<ErrorT>, T | undefined];
export declare type ResultA<T, ErrorT extends Error = Error> = Promise<Result<T, ErrorT>>;
export declare function ResultA<T = any, ErrorT extends Error = Error>(x: Promise<T> | ((resolve: (value: undefined | T | Error) => void, reject: (err?: ResultErr<ErrorT>) => void) => void)): ResultA<T, ErrorT>;
export declare function ResultOk<T = any>(value: T): Result<T, any>;
export declare function ResultErr<ErrorT extends Error = Error, T = any>(err?: ErrorT | true | string): Result<T, ErrorT>;
/** import lib/global instead */
export declare function registerGlobally(global?: any): Result<boolean>;
export declare function resultAll<Results extends ResultA<any>[]>(...results: Results): Promise<{
    err: ResultErr | undefined;
    values: {
        [i in keyof Results]: PickSecondItem<PromiseType<Results[i]>, undefined>;
    };
    results: {
        [i in keyof Results]: PromiseType<Results[i]>;
    };
}>;
declare type PromiseType<PromiseT> = PromiseT extends Promise<infer T> ? T : never;
declare type PickSecondItem<T, Fail = never> = T extends any[] ? T[1] : Fail;
export {};
