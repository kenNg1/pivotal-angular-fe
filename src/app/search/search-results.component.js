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
import { EventService } from '../shared/event.service';
import { SportService } from '../shared/sport.service';
import { DistrictService } from '../shared/district.service';
var SearchResultsComponent = (function () {
    function SearchResultsComponent(eventService, sportService, districtService) {
        this.eventService = eventService;
        this.sportService = sportService;
        this.districtService = districtService;
        this.sortBy = 'date';
        this.filterBy = 'all';
        this.visibleEvents = [];
        this.filteredEvents = [];
        this.sports = [];
        this.districts = [];
        this.eventMapping = { '=0': 'No results', '=1': '1 result', 'other': '# results' };
        // PRIOR TO promises implementation
        // ngOnInit() {
        //   this.events = this.eventService.getEvents().map(events => events)
        //   this.visibleEvents = this.events
        //   this.sortDate()
        //   return this.visibleEvents
        // }
        /// material slider
        this.autoTicks = false;
        this.disabled = false;
        this.invert = false;
        this.max = 100;
        this.min = 0;
        this.showTicks = false;
        this.step = 1;
        this.thumbLabel = true;
        this.value = 0;
        this.vertical = false;
        this._tickInterval = 1;
    }
    SearchResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.getEvents().then(function (events) {
            console.log(events);
            _this.events = events;
            _this.visibleEvents = events;
            _this.filteredEvents = events;
            _this.sortDate();
            _this.sportService.getSports().then(function (sports) {
                console.log('sports', sports);
                _this.sports = sports;
                if (_this.sportService.searchedSportId) {
                    _this.filterSport(_this.sportService.searchedSportName, _this.sportService.searchedSportId);
                    _this.searchedSport = _this.sportService.searchedSportName;
                    _this.searchedSportId = _this.sportService.searchedSportId;
                    _this.sportService.searchedSportId = null;
                }
            });
        });
        this.districtService.getDistricts().then(function (districts) {
            _this.districts = districts;
        });
    };
    SearchResultsComponent.prototype.resetSearch = function () {
        this.searchedSport = null;
        this.visibleEvents = this.events;
    };
    SearchResultsComponent.prototype.filterSport = function (sportName, sportId) {
        document.getElementById('clearSearch').click();
        this.searchedDistrict = null;
        this.searchedSport = sportName;
        console.log(sportId);
        this.visibleEvents = this.filteredEvents = this.visibleEvents.filter(function (event) {
            return event.sport_id === sportId;
        });
        console.log(this.visibleEvents);
    };
    SearchResultsComponent.prototype.filterDistrict = function (districtName, districtId) {
        document.getElementById('clearSearch').click();
        this.searchedSport = null;
        this.searchedDistrict = districtName;
        console.log(districtId);
        this.visibleEvents = this.filteredEvents = this.visibleEvents.filter(function (event) {
            return event.district_id === districtId;
        });
    };
    // filterDate(value){
    //   console.log(value)
    //   this.searchedDate = value
    //   this.visibleEvents = this.filteredEvents = this.events.filter(function(event){
    //     return event.date === value
    //   })
    // }
    SearchResultsComponent.prototype.sortDate = function () {
        this.visibleEvents = this.visibleEvents.sort(sortByDateAsc);
    };
    SearchResultsComponent.prototype.sortPrice = function () {
        this.visibleEvents = this.visibleEvents.sort(sortByPriceAsc);
    };
    SearchResultsComponent.prototype.filterAll = function () {
        this.visibleEvents = this.filteredEvents;
    };
    SearchResultsComponent.prototype.filterBeginner = function () {
        this.visibleEvents = this.filteredEvents.filter(function (event) {
            return event.level.toLowerCase() === 'beginners';
        });
    };
    SearchResultsComponent.prototype.filterIntermediate = function () {
        this.visibleEvents = this.filteredEvents.filter(function (event) {
            return event.level.toLowerCase() === 'intermediate';
        });
    };
    SearchResultsComponent.prototype.filterAdvanced = function () {
        this.visibleEvents = this.filteredEvents.filter(function (event) {
            return event.level.toLowerCase() === 'advanced';
        });
    };
    Object.defineProperty(SearchResultsComponent.prototype, "tickInterval", {
        get: function () {
            return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
        },
        set: function (v) {
            this._tickInterval = Number(v);
        },
        enumerable: true,
        configurable: true
    });
    return SearchResultsComponent;
}());
SearchResultsComponent = __decorate([
    Component({
        selector: 'app-search-results',
        templateUrl: './search-results.component.html',
        styleUrls: ['./search-results.component.scss']
    }),
    __metadata("design:paramtypes", [EventService, SportService, DistrictService])
], SearchResultsComponent);
export { SearchResultsComponent };
function sortByDateAsc(e1, e2) {
    if (e1.date > e2.date)
        return 1;
    else if (e1.date === e2.date)
        return 0;
    else
        return -1;
}
function sortByPriceAsc(e1, e2) {
    console.log('ken');
    if (e1.price > e2.price)
        return 1;
    else if (e1.price === e2.price)
        return 0;
    else
        return -1;
}
//# sourceMappingURL=search-results.component.js.map