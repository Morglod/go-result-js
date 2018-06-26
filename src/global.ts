export {}

import {
    ResultA as ResultA_,
    ResultOk as ResultOk_,
    ResultErr as ResultErr_,
    registerGlobally
} from './index';

declare const ResultA: typeof ResultA_;
declare const ResultOk: typeof ResultOk_;
declare const ResultErr: typeof ResultErr_;

registerGlobally();