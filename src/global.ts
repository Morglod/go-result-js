export {};

import {
    ResultA as ResultA_,
    ResultOk as ResultOk_,
    ResultErr as ResultErr_,
    registerGlobally
} from './';

declare global {
    const ResultA: typeof ResultA_;
    const ResultOk: typeof ResultOk_;
    const ResultErr: typeof ResultErr_;
}

registerGlobally();