import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TourInventoryService } from '../../services/tour-inventory.service';
import { tap } from 'rxjs/operators';
import { isEmpty } from 'rxjs';
import { faClockFour  } from '@fortawesome/free-regular-svg-icons';
import { faTruckPickup, faChartLine, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

interface CruiseLine {
  shipCompanyId: number;
  shipCompanyName: string;
  dataSource: string;
}

interface Ship {
  shipId: number;
  shipName: string;
}

interface ShipItineraryDates {
  cruiseStartsInString: string;
  departureDate: string;
  refID: string;
}

interface cruiseData {
  cruiseLine: CruiseLine,
  ship: Ship,
  sailingDate: ShipItineraryDates
}

@Component({
  selector: 'app-tour-inventory-list',
  templateUrl: './tour-inventory-list.component.html',
  styleUrls: ['./tour-inventory-list.component.css']
})
export class TourInventoryListComponent implements OnInit, AfterViewInit {

  constructor(private tourInventoryService: TourInventoryService,
              private router: Router) {}
  tourList:any = [];
  cruiseData: cruiseData[] = [];
  faClock = faClockFour;
  faTruckPickup = faTruckPickup;
  faChartLine = faChartLine;
  faCalendarDays = faCalendarDays;
  showMore: boolean = false;
  searchTour: boolean = false;

  ngOnInit() {
    this.tourList = [];
    
  }

  ngAfterViewInit() {
    this.searchTour = false;
    this.tourList = [];
    this.tourInventoryService.currentselectedCruiseData
      .pipe(
        tap(val1 => {
          //this.cruiseData = val.data; 
          this.searchTour = false;
          this.tourList = [];
          if(val1)
          {
            console.log(val1.data.cruiseLine);
            console.log(val1.data.ship);
            console.log(val1.data.shipItineraryDate);
            
            //this.tourInventoryService.getTourInventoryList('cruise',4, 7, 0, 'CARNIVALMI15052023','2023-05-15T06:28:58.744Z')
            if(val1.data.searchType === "cruise")
            {
              this.tourInventoryService.getTourInventoryListByCruise(val1.data.cruiseLine.shipCompanyId, val1.data.ship.shipId, val1.data.shipItineraryDate.refID.replace(/-/gi, ''), '')
              .pipe(
                tap(val => {
                  this.tourList = val.data;
                  if(val1.data.searchBy === 'date')
                  {
                    this.tourList = this.tourList.filter((item:any) => item.tourInventoryDate.slice(0,-9) === val1.data.selectedItinerary.slice(0,-9))
                  }
                  this.searchTour = true;
                  this.tourList = this.tourList.map((item: any)=> ({
                    ...item,
                    showMore:false
                  }))
                })
              ).subscribe();
            } else {
           
                let bookingDateStr = val1.data.bookingDate.getMonth() + 1 + "/" + val1.data.bookingDate.getDate() + "/" + val1.data.bookingDate.getFullYear();
                  this.tourInventoryService.getTourInventoryListByPort(val1.data.port.value, bookingDateStr)
                  .pipe(
                    tap(val => {
                      console.log(val);
                      this.searchTour = true;
                      this.tourList = val.data;
                      this.tourList = this.tourList.map((item: any)=> ({
                        ...item,
                        showMore:false
                      }))
                    })
                  ).subscribe();
            }

          }
        }
    )).subscribe();


  }

  getTourDetails(tourInventoryID:any) {
    this.router.navigate(['/tour', tourInventoryID]);
  }

}
