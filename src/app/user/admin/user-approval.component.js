var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DetailService } from "../detail.service";
var UserApprovalComponent = (function () {
    function UserApprovalComponent(detailService) {
        this.detailService = detailService;
    }
    UserApprovalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.detailService.getDetails().then(function (res) {
            _this.details = res;
        });
    };
    UserApprovalComponent.prototype.changeTier = function (id, tier) {
        var _this = this;
        this.detailService.updateUserTier(id, this.belowThree(tier))
            .then(function (response) {
            // find the index of the array to be replaced
            var index = _this.details.findIndex(function (x) { return x.id == id; });
            // replace that element of array with response.json()
            return _this.details[index] = response.json();
            // save the new array as this.details
        });
    };
    UserApprovalComponent.prototype.belowThree = function (tier) {
        var newTier = parseInt(tier);
        if (newTier < 3) {
            return newTier += 1;
        }
        else {
            return 0;
        }
    };
    return UserApprovalComponent;
}());
UserApprovalComponent = __decorate([
    Component({
        selector: 'app-user-approval',
        templateUrl: './user-approval.component.html',
        styleUrls: ['./user-approval.component.scss']
    }),
    __metadata("design:paramtypes", [DetailService])
], UserApprovalComponent);
export { UserApprovalComponent };
//# sourceMappingURL=user-approval.component.js.map