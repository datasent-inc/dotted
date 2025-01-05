"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.place = void 0;
var types_ts_1 = require("./types.ts");
var criterionParse_ts_1 = require("./criterionParse.ts");
var pick_ts_1 = require("./pick.ts");
var queryStringToCriteria_ts_1 = require("./queryStringToCriteria.ts");
var place = function (value, object, query) {
    var _a;
    if (typeof query === "string") {
        query = (0, queryStringToCriteria_ts_1.queryStringToCriteria)(query);
    }
    var placement = value;
    query = query.reverse();
    for (var idx = 0; idx < query.length; idx++) {
        var criterion = (0, criterionParse_ts_1.criterionParse)(query[idx]);
        if (criterion.type === types_ts_1.CriterionType.objectMatch) {
            placement = (_a = {},
                _a[criterion.search] = placement,
                _a);
            Object.assign(object, placement);
        }
        else if (criterion.type === types_ts_1.CriterionType.arrayAppend) {
            var arrayToAppend = (0, pick_ts_1.pick)(object, query.slice(-1).reverse());
            arrayToAppend.push(placement);
            (0, exports.place)(arrayToAppend, placement, query.slice(-1).reverse());
            placement = arrayToAppend;
        }
        else if (criterion.type === types_ts_1.CriterionType.arrayMatch) {
            var arrayToPlace = (0, pick_ts_1.pick)(object, query.slice(-1).reverse());
            arrayToPlace[criterion.search] = placement;
            placement = arrayToPlace;
        }
        else if (criterion.type === types_ts_1.CriterionType.root) {
            object = __assign(__assign({}, object), value);
            idx = query.length;
        }
    }
    return object;
};
exports.place = place;
