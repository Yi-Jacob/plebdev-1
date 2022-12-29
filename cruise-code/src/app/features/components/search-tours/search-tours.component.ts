import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, EventEmitter, Output, Input} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { TourInventoryService } from '../../services/tour-inventory.service';
import { tap } from 'rxjs/operators';
import {  MatCalendarCellClassFunction, MatDatepickerModule, MatCalendar, MatDatepickerInputEvent, MatDatepickerInput, MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';

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

interface Region {
  value: number
  text: string
}

interface Port {
  value: number
  text: string
}

@Component({
  selector: 'app-search-tours',
  templateUrl: './search-tours.component.html',
  styleUrls: ['./search-tours.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchToursComponent implements OnInit {

  @ViewChild("searchForm", { static: false }) searchForm!: NgForm;
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  @ViewChild('input', { static: false }) public inputDate!: MatInput;
  @Output() selectEvent = new EventEmitter<any>;
  
  constructor(private tourInventoryService: TourInventoryService) { }

  
  cruiseLines: CruiseLine[] = [];
  shipLists: Ship[] = [];
  shipItineraryDates: ShipItineraryDates[] = [];
  regions: Region[] = [];
  ports: Port[] = [];
  availablePortDates: Date[] = [];
  selectedShipCompany!: CruiseLine;
  selectedShip!: Ship;
  selectedItineraryDate!: ShipItineraryDates;
  selectedPort: any;
  selectedRegion: any;
  searchMode: string = '';
  startDate  = new Date("11/06/2022");
  endDate = new Date("12/06/2022");
  availableDatesString: any = [];
  availableDatesStringSliced: any = [];
  value!: Date;
  selectedDate!: Date;
  selectedMonth!: Date;

  ngOnInit(): void {
    this.searchMode = 'cruise';
    this.tourInventoryService.getShipCompanyList()
    .pipe(
      tap(val => {
        console.log(val);
       this.cruiseLines = val.data;
       console.log(this.cruiseLines);
      })
    ).subscribe();

    this.tourInventoryService.getRegions()
    .pipe(
      tap(val => {
       this.regions = val.data;
      })
    ).subscribe();
  }
  
  getShipLists(selCruiseLine: CruiseLine, f: NgForm) {
    this.shipItineraryDates = [];
    this.tourInventoryService.updateData('');
    this.searchForm.controls["shipItineraryDatesCtrl"].patchValue(undefined);
    this.tourInventoryService.getShipListByCompany(selCruiseLine.shipCompanyId)
    .pipe(
      tap(val => {
       this.shipLists = val.data;
      }, err => console.log("here charu " + err.message))
    ).subscribe();
    this.searchForm.controls["shipCtrl"].patchValue(undefined);
  }

  
  getShipItineraryDatesList(selCruiseLine: CruiseLine, selShip: Ship) {
    this.tourInventoryService.updateData('');
    this.searchForm.controls["shipItineraryDatesCtrl"].patchValue(undefined);
    this.tourInventoryService.getShipItineraryDatesList(selCruiseLine.shipCompanyName, selShip.shipName)
    .pipe(
      tap(val => {
       this.shipItineraryDates = val.data;
      })
    ).subscribe();
  }
  
  getShipItineraryDates(selCruiseLine: CruiseLine, selShip: Ship) {
    let data = {
      'searchType': 'cruise',
      'searchBy': 'refId',
      'cruiseLine': this.selectedShipCompany, 
      'ship': this.selectedShip, 
      'shipItineraryDate': this.selectedItineraryDate
    }
    this.tourInventoryService.updateData({data: data});
    this.selectEvent.emit({data: data});
    this.tourInventoryService.getShipItineraryDates(selCruiseLine.shipCompanyId, selShip.shipId)
    .pipe(
      tap(val => {
        console.log(val);
       
      })
    ).subscribe();
  }
  
  getPortsList(selRegion: any) {
    this.searchForm.controls["portCtrl"].patchValue(undefined);
    this.tourInventoryService.updateData('');
    this.availableDatesString = [];
    this.tourInventoryService.getPorts(selRegion.text)
    .pipe(
      tap(val => {
       this.ports = val.data;
      })
    ).subscribe();
  }

  getMarkedDays(date: any) {
    const dateString = `${date.year.toString()}-${('00' + (date.month + 1).toString()).substr(-2)}-${('00' + date.day.toString()).substr(-2)}`;
    const returnedStatus = this.availableDatesStringSliced.indexOf(dateString) > -1 ? true : false;
    return returnedStatus;
  }


  getAvailableDatesByPort(selPort: any) {
    
    this.availableDatesString = [];
    this.availableDatesStringSliced = [];
    this.tourInventoryService.updateData('');
    this.tourInventoryService.getAvailableDatesByPort(selPort.text)
      .pipe(
        tap(val => {
          let arrAvailDates = val.data;
          
          arrAvailDates.forEach((element: { [x: string]: any; }) => {
            this.availableDatesString.push(element['tour_inventory_date']);
           
          });
          
          arrAvailDates.forEach((element: { [x: string]: any; }) => {
            this.availableDatesStringSliced.push(element['tour_inventory_date'].slice(0,-9));
           
          });
          console.log(this.availableDatesString);
         
         
        })
      ).subscribe();
    
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (this.selectedPort != '' && this.selectedPort != undefined && this.selectedPort != null) 
    {
      let data = {
        'searchType': 'port',
        'port': this.selectedPort, 
        'bookingDate': event.value
      }
      this.tourInventoryService.updateData({data: data});
    }
    //console.log(this.selectedDate);
  }
  
  clearDate(event: { stopPropagation: () => void; }) {
    event.stopPropagation();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => { 
      const highlightDate = this.availableDatesString
      .map((strDate:any) => new Date(strDate))
      .some(
        (d:any) =>
          d.getDate() === cellDate.getDate() &&
          d.getMonth() === cellDate.getMonth() &&
          d.getFullYear() === cellDate.getFullYear()
      );

    return highlightDate ? 'custom-date-class' : '';
   }

 
 
  toggleSearch(mode: string) {
    this.tourInventoryService.updateData('');
   
    if (mode === 'cruise') { 
      this.searchMode = 'port';
      this.searchForm.controls["shipCompanyCtrl"].patchValue(undefined);
     
      this.shipLists = [];
      this.searchForm.controls["shipCtrl"].patchValue(undefined);
      this.shipItineraryDates = [];
      this.searchForm.controls["shipItineraryDatesCtrl"].patchValue(undefined);
    }
    else {
      this.searchMode = 'cruise';
      this.ports = []
      this.searchForm.controls["portCtrl"].patchValue(undefined);
      this.searchForm.controls["regionCtrl"].patchValue(undefined);
    }
  }  
}