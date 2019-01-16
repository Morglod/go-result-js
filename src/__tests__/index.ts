import { ResultA, ResultErr, ResultOk, Result, registerGlobally, resultAll } from '../index';

const ERROR_TEXT = 'Can not divide by zero!';

function divide(a: number, b: number): Result<number> {
    if (b === 0) return ResultErr(ERROR_TEXT);
    return ResultOk(a / b);
}

const asyncDivide = (a: number, b: number): ResultA<number> => ResultA<number>(resolve => {
    resolve(b === 0 ? new Error(ERROR_TEXT) : a / b);
});

describe('divide', () => {
    it('divide(10 / 2)', () => {
        const result = divide(10, 2);
        expect(result).toMatchObject([ undefined, 5 ]);
    });

    it('divide(10 / 5)', () => {
        const result = divide(10, 5);
        expect(result).toMatchObject([ undefined, 2 ]);
    });

    it('divide(10 / 0)', () => {
        const result = divide(10, 0);
        expect(result).toBeDefined();
        expect(result[0]).toBeDefined();
        expect(result[0]).toBeInstanceOf(Error);
        expect((result[0] as Error).message).toBe(ERROR_TEXT);
        expect(result[1]).toBeUndefined();
    });
});

describe('async divide', () => {
    it('divide(10 / 2)', async () => {
        const resultP = asyncDivide(10, 2);
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toMatchObject([ undefined, 5 ]);
    });

    it('divide(10 / 5)', async () => {
        const resultP = asyncDivide(10, 5);
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toMatchObject([ undefined, 2 ]);
    });

    it('divide(10 / 0)', async () => {
        const resultP = asyncDivide(10, 0);
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result[0]).toBeDefined();
        expect(result[0]).toBeInstanceOf(Error);
        expect((result[0] as Error).message).toBe(ERROR_TEXT);
        expect(result[1]).toBeUndefined();
    });
});

describe('async', () => {
    it('resolve value from promise', async () => {
        const resultP = ResultA(Promise.resolve('hello'));
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result).toMatchObject([ undefined, 'hello' ]);
    });
    it('resolve undefined', async () => {
        const resultP = ResultA(resolve => resolve(undefined));
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result).toMatchObject([ undefined, undefined ]);
    });
    it('resolve Error as error', async () => {
        const resultP = ResultA(resolve => resolve(new Error(ERROR_TEXT)));
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result[0]).toBeDefined();
        expect(result[0]).toBeInstanceOf(Error);
        expect((result[0] as Error).message).toBe(ERROR_TEXT);
    });
    it('reject Error', async () => {
        const resultP = ResultA((_, reject) => reject(new Error(ERROR_TEXT)));
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result[0]).toBeDefined();
        expect(result[0]).toBeInstanceOf(Error);
        expect((result[0] as Error).message).toBe(ERROR_TEXT);
    });
});

describe('async catch', () => {
    it('catch error of promise', async () => {
        const promise = new Promise((_, reject) => reject(new Error(ERROR_TEXT)));
        const resultP = ResultA(promise);
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result[0]).toBeDefined();
        expect(result[0]).toBeInstanceOf(Error);
        expect((result[0] as Error).message).toBe(ERROR_TEXT);
    });
    it('trycatch error', async () => {
        const resultP = ResultA(function(resolve) {
            throw new Error(ERROR_TEXT);
        });
        
        expect(resultP).toBeInstanceOf(Promise);
        const result = await resultP;
        expect(result).toBeDefined();
        expect(result[0]).toBeDefined();
        expect(result[0]).toBeInstanceOf(Error);
        expect((result[0] as Error).message).toBe(ERROR_TEXT);
    });
});

describe('registerGlobally', () => {
    it('registerGlobally to global', () => {
        const [ err, ok ] = registerGlobally();
        expect(err).toBe(undefined);
        expect(ok).toBe(true);

        const global = eval('(window || global)');
        const methods = { ResultA, ResultErr, ResultOk };

        for (const [ name, method ] of Object.entries(methods)) {
            expect(global[name]).toBe(method);
        }
    });

    it('registerGlobally to custom', () => {
        const global: any = {};
        const [ err, ok ] = registerGlobally(global);
        expect(err).toBe(undefined);
        expect(ok).toBe(true);

        const methods = { ResultA, ResultErr, ResultOk };
        
        for (const [ name, method ] of Object.entries(methods)) {
            expect(global[name]).toBe(method);
        }
    });
});

describe('resultAll', () => {
    it('resultAll just works', async () => {
        const { err, values } = await resultAll(
            ResultA(Promise.resolve(123)),
            ResultA(Promise.resolve(true)),
            ResultA(Promise.resolve('hello'))
        );

        expect(err).toBe(undefined);
        expect(values[0]).toBe(123);
        expect(values[1]).toBe(true);
        expect(values[2]).toBe('hello');
    });

    it('resultAll handle error', async () => {
        const { err, values } = await resultAll(
            ResultA(Promise.resolve(123)),
            ResultA(Promise.reject('my error')),
            ResultA(Promise.resolve('hello'))
        );

        expect(err).toBe('my error');
        expect(values[0]).toBe(123);
        expect(values[1]).toBe(undefined);
        expect(values[2]).toBe('hello');
    });
});