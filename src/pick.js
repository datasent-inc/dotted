"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
var types_ts_1 = require("./types.ts");
var criterionParse_ts_1 = require("./criterionParse.ts");
var queryStringToCriteria_ts_1 = require("./queryStringToCriteria.ts");
var pick = function (object, query) {
    if (typeof query === "string") {
        query = (0, queryStringToCriteria_ts_1.queryStringToCriteria)(query);
    }
    var current = object;
    var reductionCount = query.filter(function (search) { return (0, criterionParse_ts_1.criterionParse)(search).type === types_ts_1.CriterionType.arrayWildCard; }).length;
    for (var queryIdx = 0; queryIdx < query.length; queryIdx++) {
        var search = query[queryIdx];
        var criterion = (0, criterionParse_ts_1.criterionParse)(search);
        if (criterion.type === types_ts_1.CriterionType.objectMatch) {
            current = current[criterion.search];
        }
        else if (criterion.type === types_ts_1.CriterionType.arrayMatch) {
            current = current[criterion.search];
        }
        else if (criterion.type === types_ts_1.CriterionType.arrayWildCard) {
            var pulled = [];
            for (var currentIdx = 0; currentIdx < current.length; currentIdx++) {
                pulled.push((0, exports.pick)(current[currentIdx], query.slice(queryIdx + 1, query.length)));
            }
            current = pulled;
            queryIdx = query.length;
        }
    }
    if (reductionCount > 1) {
        var reduced = [];
        for (var _i = 0, current_1 = current; _i < current_1.length; _i++) {
            var child = current_1[_i];
            for (var _a = 0, child_1 = child; _a < child_1.length; _a++) {
                var value = child_1[_a];
                reduced.push(value);
            }
        }
        current = reduced;
    }
    return current;
};
exports.pick = pick;
