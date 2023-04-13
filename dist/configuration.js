"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidwayCommonConfiguration = void 0;
// src/configuration.ts
const core_1 = require("@midwayjs/core");
const axios = require("@midwayjs/axios");
let MidwayCommonConfiguration = class MidwayCommonConfiguration {
    async onReady() {
        // ...
    }
};
MidwayCommonConfiguration = __decorate([
    (0, core_1.Configuration)({
        namespace: 'midway-common',
        imports: [axios]
    })
], MidwayCommonConfiguration);
exports.MidwayCommonConfiguration = MidwayCommonConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVCQUF1QjtBQUN2Qix5Q0FBK0M7QUFDL0MseUNBQXlDO0FBTWxDLElBQU0seUJBQXlCLEdBQS9CLE1BQU0seUJBQXlCO0lBQ3BDLEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTTtJQUNSLENBQUM7Q0FDRixDQUFBO0FBSlkseUJBQXlCO0lBSnJDLElBQUEsb0JBQWEsRUFBQztRQUNiLFNBQVMsRUFBRSxlQUFlO1FBQzFCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNqQixDQUFDO0dBQ1cseUJBQXlCLENBSXJDO0FBSlksOERBQXlCIn0=