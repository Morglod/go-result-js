"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function ResultA(x) {
    return new Promise((function (resolve) {
        if (x instanceof Promise) {
            x.then(function (value) { return resolve([undefined, value]); })
                .catch(function (err) { return resolve([err, undefined]); });
        }
        else {
            try {
                x(function (value) {
                    if (value instanceof Error)
                        resolve([value, undefined]);
                    else
                        resolve([undefined, value]);
                }, function (err) {
                    resolve([err || true, undefined]);
                });
            }
            catch (err) {
                resolve([err, undefined]);
            }
        }
    }));
}
exports.ResultA = ResultA;
function ResultOk(value) {
    return [undefined, value];
}
exports.ResultOk = ResultOk;
function ResultErr(err) {
    if (err === void 0) { err = true; }
    if (typeof err === 'string')
        err = new Error(err);
    return [err, undefined];
}
exports.ResultErr = ResultErr;
/** import lib/global instead */
function registerGlobally(global) {
    if (!global)
        global = eval('(window || global)');
    if (!global)
        return ResultErr(new Error('No global object'));
    else {
        global.ResultA = ResultA;
        global.ResultOk = ResultOk;
        global.ResultErr = ResultErr;
        return ResultOk(true);
    }
}
exports.registerGlobally = registerGlobally;
function resultAll() {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        results[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var r, anyError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(results)];
                case 1:
                    r = _a.sent();
                    anyError = r.find(function (x) { return x[0] !== undefined; });
                    return [2 /*return*/, {
                            err: anyError ? anyError[0] : undefined,
                            values: r.map(function (x) { return x[1]; }),
                            results: r,
                        }];
            }
        });
    });
}
exports.resultAll = resultAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLFNBQWdCLE9BQU8sQ0FDbkIsQ0FHVTtJQUVWLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxVQUFDLE9BQW1DO1FBQ3BELElBQUksQ0FBQyxZQUFZLE9BQU8sRUFBRTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLENBQUUsU0FBUyxFQUFFLEtBQUssQ0FBRSxDQUFDLEVBQTdCLENBQTZCLENBQUM7aUJBQzVDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxDQUFFLEdBQUcsRUFBRSxTQUFTLENBQUUsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNILElBQUk7Z0JBQ0EsQ0FBQyxDQUFDLFVBQUMsS0FBSztvQkFDSixJQUFJLEtBQUssWUFBWSxLQUFLO3dCQUFFLE9BQU8sQ0FBQyxDQUFFLEtBQUssRUFBRSxTQUFTLENBQUUsQ0FBQyxDQUFDOzt3QkFDckQsT0FBTyxDQUFDLENBQUUsU0FBUyxFQUFFLEtBQUssQ0FBRSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsRUFBRSxVQUFDLEdBQUc7b0JBQ0gsT0FBTyxDQUFDLENBQUUsR0FBRyxJQUFFLElBQUksRUFBRSxTQUFTLENBQUUsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTSxHQUFHLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLENBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBRSxDQUFDLENBQUM7YUFDL0I7U0FDSjtJQUNMLENBQUMsQ0FBUSxDQUFDLENBQUM7QUFDZixDQUFDO0FBdkJELDBCQXVCQztBQUVELFNBQWdCLFFBQVEsQ0FBVSxLQUFRO0lBQ3RDLE9BQU8sQ0FBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0IsU0FBUyxDQUF3QyxHQUE4QjtJQUE5QixvQkFBQSxFQUFBLFVBQThCO0lBQzNGLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtRQUFFLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQVcsQ0FBQztJQUM1RCxPQUFPLENBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBRSxDQUFDO0FBQzlCLENBQUM7QUFIRCw4QkFHQztBQUVELGdDQUFnQztBQUNoQyxTQUFnQixnQkFBZ0IsQ0FBQyxNQUFZO0lBQ3pDLElBQUksQ0FBQyxNQUFNO1FBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7QUFDTCxDQUFDO0FBVEQsNENBU0M7QUFFRCxTQUFzQixTQUFTO0lBQzNCLGlCQUFtQjtTQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7UUFBbkIsNEJBQW1COzs7Ozs7d0JBVVQscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQTs7b0JBQTlCLENBQUMsR0FBRyxTQUEwQjtvQkFDOUIsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFsQixDQUFrQixDQUFDLENBQUM7b0JBRWpELHNCQUFPOzRCQUNILEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzs0QkFDdkMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUosQ0FBSSxDQUFROzRCQUMvQixPQUFPLEVBQUUsQ0FBUTt5QkFDcEIsRUFBQzs7OztDQUNMO0FBbkJELDhCQW1CQyJ9