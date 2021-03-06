[![NPM Version](https://badge.fury.io/js/go-result-js.svg?style=flat)](https://www.npmjs.com/package/go-result-js)
[![Coverage](https://img.shields.io/codecov/c/github/Morglod/go-result-js.svg)](https://codecov.io/gh/Morglod/go-result-js)

# go-result-js

Go-like results:

```js
const [ err, result ] = foo();
```

* Zero dependencies
* Full typescript support
* 100% test coverage

## Usage

Install:

```sh
npm i go-result-js
```

Import:

```ts
import { ResultA, ResultErr, ResultOk } from 'go-result-js';
```

Or use it globally:  
(write in main file, before everythink)
```ts
import 'go-result-js/lib/global';
```

## Example with exceptions

Before:
```ts
const result = await doSmthWithException();
// (node:17320) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): Error: Request failed with status code 400
// (node:17320) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

After:
```ts
const [ err, result ] = await ResultA(doSmthWithException());
if (err || !result) {
    // exception handled!
}
```

## Example

```ts
function divide(a: number, b: number): Result<number> {
    if (b === 0) return ResultErr('Can not divide by zero!');
    return ResultOk(a / b);
}

function main() {
    const [ err, result ] = divide(10, 5);

    if (err) console.error(err);
    else console.log('success', result);
}
```

## Example with async

```ts
const asyncDivide = (a: number, b: number): ResultA<number> => ResultA<number>(resolve => {
    resolve(b === 0 ? new Error('Can not divide by zero!') : a / b);
});

async function asyncMain() {
    const [ err, result ] = await asyncDivide(10, 5);

    if (err) console.error(err);
    else console.log('success', result);
}
```

## Example with AWS

```ts
import { Auth } from 'aws-amplify';

export async function main() {
    const [ err, user ] = await ResultA(Auth.signIn('root', 'password'));
}
```

## Multiple results

Handle multiple `ResultA` results, and catch any errors.

```ts
const { err, values } = await resultAll(
    Content.fetchById(contentType, id),
    Rubrics.fetchRubrics(),
    ContentTypes.fetchContentTypes(),
);

if (err) {
    // on any error
}

const {
    0: content,
    1: rubrics,
    2: contentTypes,
} = values;
```

## API

<details>
<summary>Types</summary>

```ts
export type ResultErr<ErrorT extends Error = Error> = ErrorT|true|undefined;
export type Result<T, ErrorT extends Error = Error> = [ ResultErr<ErrorT>, T|undefined ];
export type ResultA<T, ErrorT extends Error = Error> = Promise<Result<T, ErrorT>>;
```

</details>

<details>
<summary>Methods</summary>

```ts
function registerGlobally(global?: any): Result<boolean>
```

Assign all methods to `global` object.  
`go-result-js/lib/global` calls it.

```ts
function ResultOk<T>(value: T): Result<T>
```

Returns `value` with undefined error.

```ts
function ResultErr<ErrorT extends Error, T=any>(err: ErrorT|true|string = true): Result<T, ErrorT>
```

Returns `error` with undefined value.

```ts
function ResultA<T, ErrorT extends Error>(
    x: Promise<T> | ((
        resolve: (value: undefined|T|Error) => void,
        reject: (err?: ErrorT) => void
    ) => void)
): ResultA<T, ErrorT>
```

Takes `Promise's callbacks` or `Promise`, catch it's error and resolve as `Promise<Result>`.


```ts
function resultAll<Results extends ResultA<any>[]>(
    ...results: Results
): Promise<{
    err: ResultErr | undefined,
    values: {
        [i in keyof Results]: PickSecondItem<PromiseType<Results[i]>, undefined>
    },
    results: {
        [i in keyof Results]: PromiseType<Results[i]>
    }
}>
```

</details>
