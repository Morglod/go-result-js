export type ResultErr<ErrorT extends Error = Error> = ErrorT|true|undefined;
export type Result<T, ErrorT extends Error = Error> = [ ResultErr<ErrorT>, T|undefined ];
export type ResultA<T, ErrorT extends Error = Error> = Promise<Result<T, ErrorT>>;

export function ResultA<T = any, ErrorT extends Error = Error>(
    x: Promise<T> | ((
        resolve: (value: undefined|T|Error) => void,
        reject: (err?: ResultErr<ErrorT>) => void
    ) => void)
): ResultA<T, ErrorT> {
    return new Promise(((resolve: (value: Result<T>) => void) => {
        if (x instanceof Promise) {
            x.then(value => resolve([ undefined, value ]))
             .catch(err => resolve([ err, undefined ]));
        } else {
            try {
                x((value) => {
                    if (value instanceof Error) resolve([ value, undefined ]);
                    else resolve([ undefined, value ]);
                }, (err) => {
                    resolve([ err||true, undefined ]);
                });
            } catch(err) {
                resolve([ err, undefined ]);
            }
        }
    }) as any);
}

export function ResultOk<T = any>(value: T): Result<T> {
    return [ undefined, value ];
}

export function ResultErr<T = any, ErrorT extends Error = Error>(err: ErrorT|true|string = true): Result<T, ErrorT> {
    if (typeof err === 'string') err = new Error(err) as ErrorT;
    return [ err, undefined ];
}

export function registerGlobally(global?: any): Result<boolean> {
    if (!global) global = eval('(window || global)');
    if (!global) return ResultErr(new Error('No global object'));
    else {
        global.ResultA = ResultA;
        global.ResultOk = ResultOk;
        global.ResultErr = ResultErr;
        return ResultOk(true);
    }
}