"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryStringToCriteria = void 0;
var queryStringToCriteria = function (queryString) {
    var split = queryString.split(".");
    if (split[0] === split[1] && split[0] === "") {
        return [""];
    }
    var rest = split.slice(1);
    return rest;
};
exports.queryStringToCriteria = queryStringToCriteria;
