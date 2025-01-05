"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criterionParse = void 0;
var types_ts_1 = require("./types.ts");
var criterionParse = function (search) {
    if (search.hasOwnProperty("type")) {
        return search;
    }
    else if (search === "") {
        return {
            search: "",
            type: types_ts_1.CriterionType.root,
        };
    }
    else if (search.match(/^\[\*]$/) !== null) {
        return {
            search: "[*]",
            type: types_ts_1.CriterionType.arrayWildCard,
        };
    }
    else if (search.match(/^\[]$/) !== null) {
        return {
            search: "[]",
            type: types_ts_1.CriterionType.arrayAppend,
        };
    }
    else if (search.match(/^\[\d+]$/) !== null) {
        return {
            search: Number(search.replace("[", "").replace("]", "")),
            type: types_ts_1.CriterionType.arrayMatch,
        };
    }
    else {
        return {
            search: search,
            type: types_ts_1.CriterionType.objectMatch,
        };
    }
};
exports.criterionParse = criterionParse;
