![NPM Version](https://badge.fury.io/js/go-result-js.svg?style=flat)
![Coverage](https://img.shields.io/codecov/c/github/Morglod/go-result-js.svg)

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
import { Result, ResultErr, ResultOk } from 'go-result-js';
```

Or use it globally in js:

```js
require('go-result-js').registerGlobally();
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
import { ResultA } from './index';

export async function main() {
    const [ err, user ] = await ResultA(Auth.signIn('root', 'password'));
}
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

```ts
function ResultOk<T>(value: T): Result<T>
```

Returns `value` with undefined error.

```ts
function ResultErr<T, ErrorT extends Error>(err: ErrorT|true|string = true): Result<T, ErrorT>
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

</details>
