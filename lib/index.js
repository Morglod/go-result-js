"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxpQkFDSSxDQUdVO0lBRVYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLFVBQUMsT0FBbUM7UUFDcEQsSUFBSSxDQUFDLFlBQVksT0FBTyxFQUFFO1lBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsQ0FBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQztpQkFDNUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLENBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBRSxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0gsSUFBSTtnQkFDQSxDQUFDLENBQUMsVUFBQyxLQUFLO29CQUNKLElBQUksS0FBSyxZQUFZLEtBQUs7d0JBQUUsT0FBTyxDQUFDLENBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBRSxDQUFDLENBQUM7O3dCQUNyRCxPQUFPLENBQUMsQ0FBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUMsQ0FBQztnQkFDdkMsQ0FBQyxFQUFFLFVBQUMsR0FBRztvQkFDSCxPQUFPLENBQUMsQ0FBRSxHQUFHLElBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBRSxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFBQyxPQUFNLEdBQUcsRUFBRTtnQkFDVCxPQUFPLENBQUMsQ0FBRSxHQUFHLEVBQUUsU0FBUyxDQUFFLENBQUMsQ0FBQzthQUMvQjtTQUNKO0lBQ0wsQ0FBQyxDQUFRLENBQUMsQ0FBQztBQUNmLENBQUM7QUF2QkQsMEJBdUJDO0FBRUQsa0JBQWtDLEtBQVE7SUFDdEMsT0FBTyxDQUFFLFNBQVMsRUFBRSxLQUFLLENBQUUsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFFRCxtQkFBaUUsR0FBOEI7SUFBOUIsb0JBQUEsRUFBQSxVQUE4QjtJQUMzRixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFBRSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFXLENBQUM7SUFDNUQsT0FBTyxDQUFFLEdBQUcsRUFBRSxTQUFTLENBQUUsQ0FBQztBQUM5QixDQUFDO0FBSEQsOEJBR0M7QUFFRCwwQkFBaUMsTUFBWTtJQUN6QyxJQUFJLENBQUMsTUFBTTtRQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUN4RDtRQUNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQztBQVRELDRDQVNDIn0=