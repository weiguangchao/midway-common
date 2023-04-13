"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUtils = void 0;
const core_1 = require("@midwayjs/core");
const axios_1 = require("@midwayjs/axios");
const timeout = 5 * 1000;
let HttpUtils = class HttpUtils {
    async get(url, params) {
        return await this.request(url, 'get', params);
    }
    async post(url, params, data) {
        return await this.request(url, 'post', params, data);
    }
    async request(url, method, params, data, headers) {
        var _a;
        // default header
        let h = headers;
        if (!headers) {
            h = {
                'Content-Type': 'application/json',
            };
        }
        const response = await this.httpService.request({
            url,
            method,
            headers: h,
            params,
            data,
            timeout,
        });
        const { status, statusText } = response;
        if (status !== 200 || statusText !== 'OK') {
            throw new Error(`request error status: ${statusText}, statusText: ${statusText}`);
        }
        return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", axios_1.HttpService)
], HttpUtils.prototype, "httpService", void 0);
HttpUtils = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], HttpUtils);
exports.HttpUtils = HttpUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvSHR0cFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSwyQ0FBOEM7QUFJOUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUlsQixJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVM7SUFJcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFXLEVBQUUsTUFBWTtRQUNqQyxPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVcsRUFBRSxNQUFZLEVBQUUsSUFBVTtRQUM5QyxPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FDWCxHQUFXLEVBQ1gsTUFBcUIsRUFDckIsTUFBWSxFQUNaLElBQVUsRUFDVixPQUFhOztRQUViLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLENBQUMsR0FBRztnQkFDRixjQUFjLEVBQUUsa0JBQWtCO2FBQ25DLENBQUM7U0FDSDtRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDOUMsR0FBRztZQUNILE1BQU07WUFDTixPQUFPLEVBQUUsQ0FBQztZQUNWLE1BQU07WUFDTixJQUFJO1lBQ0osT0FBTztTQUNSLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsUUFBUSxDQUFDO1FBQ3hDLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ2IseUJBQXlCLFVBQVUsaUJBQWlCLFVBQVUsRUFBRSxDQUNqRSxDQUFDO1NBQ0g7UUFFRCxPQUFPLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksMENBQUUsSUFBSSxDQUFDO0lBQzlCLENBQUM7Q0FDRixDQUFBO0FBNUNDO0lBQUMsSUFBQSxhQUFNLEdBQUU7OEJBQ0ksbUJBQVc7OENBQUM7QUFGZCxTQUFTO0lBRnJCLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxZQUFLLEVBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7R0FDZCxTQUFTLENBNkNyQjtBQTdDWSw4QkFBUyJ9