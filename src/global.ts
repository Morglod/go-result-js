export {};

import {
    ResultA as ResultA_,
    ResultOk as ResultOk_,
    ResultErr as ResultErr_,
    Result as Result_,
    registerGlobally
} from './';

declare global {
    const ResultA: typeof ResultA_;
    const ResultOk: typeof ResultOk_;
    const ResultErr: typeof ResultErr_;
    type ResultA<T, ErrorT extends Error = Error> = ResultA_<T, ErrorT>;
    type Result<T, ErrorT extends Error = Error> = Result_<T, ErrorT>;
}

registerGlobally();