import { Component } from '@angular/core';
import { TourInventoryService } from '../../services/tour-inventory.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cruise-itinerary',
  templateUrl: './cruise-itinerary.component.html',
  styleUrls: ['./cruise-itinerary.component.css']
})
export class CruiseItineraryComponent {
  events: any[] = [];
  events1: any[] = [];
  cruiseLine: any;
  ship:any;
  shipItineraryDate:any;
  showItinerary: boolean = false;
  selectedItinerary: any;

  constructor(private tourInventoryService: TourInventoryService) {}
  
  ngOnInit() {
    
     }

  getTourExcursion() {
  
   let data = {
    'searchType': 'cruise',
    'searchBy': 'date',
    'cruiseLine': this.cruiseLine, 
    'ship': this.ship, 
    'shipItineraryDate': this.shipItineraryDate,
    'selectedItinerary': this.selectedItinerary
  }
  this.tourInventoryService.updateData({data: data});
  //this.selectEvent.emit({data: data});
  }

  ngAfterViewInit() {
    this.showItinerary = false;
    this.events1 = [];
            
    this.tourInventoryService.currentselectedCruiseData
    .pipe(
      tap(val => {
        //this.cruiseData = val.data;
        this.events1 = [];
        if(val)
        {
          if(val.data.searchType === "cruise")
          {
            this.showItinerary = true;
            
            console.log(val.data.cruiseLine);
              console.log(val.data.ship);
              console.log(val.data.shipItineraryDate);
              console.log("here");
              this.cruiseLine = val.data.cruiseLine;
              this.ship = val.data.ship;
              this.shipItineraryDate = val.data.shipItineraryDate;
              //this.tourInventoryService.getTourInventoryList('cruise',4, 7, 0, 'CARNIVALMI15052023','2023-05-15T06:28:58.744Z')
              this.tourInventoryService.getShipItineraryDatesByRefId(val.data.shipItineraryDate.refID)
              .pipe(
                tap(val1 => {
                  this.events1 = val1.data;
                  console.log(this.events1);
                })
              ).subscribe();
          }
        }
        }
      )).subscribe();

  }

}
