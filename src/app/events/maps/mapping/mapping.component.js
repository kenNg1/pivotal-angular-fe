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
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../shared/event.service';
var MappingComponent = (function () {
    function MappingComponent(eventService, route) {
        this.eventService = eventService;
        this.route = route;
        this.zoom = 18;
        this.scrollwheel = false;
    }
    MappingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.getEvent(+this.route.snapshot.params['id']).then(function (event) {
            _this.title = event.address;
            _this.eventService.getLatLong(event.address).then(function (result) {
                _this.lat = result.results[0].geometry.location.lat;
                _this.lng = result.results[0].geometry.location.lng;
            });
        });
    };
    MappingComponent.prototype.goToGoogleMaps = function () {
        console.log('hi');
        window.open("http://maps.google.com/maps?q=" + this.lat + "," + this.lng + "&ll=" + this.lat + "," + this.lng + "&z=17", "_blank");
    };
    return MappingComponent;
}());
MappingComponent = __decorate([
    Component({
        selector: 'app-mapping',
        templateUrl: './mapping.component.html',
        styles: ["\n    agm-map {\n      height: 400px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [EventService, ActivatedRoute])
], MappingComponent);
export { MappingComponent };
//# sourceMappingURL=mapping.component.js.map