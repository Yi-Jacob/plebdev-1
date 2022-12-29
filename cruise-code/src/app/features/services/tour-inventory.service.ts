import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';

const headers= new HttpHeaders()
.set('content-type', 'application/json')
.set('Access-Control-Allow-Origin', '*')
.set('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept')
.set('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')


@Injectable({
  providedIn: 'root'
})
export class TourInventoryService {
  private apiUrl = "https://api.cruisecode.com/TourInventory/";
  private selectedCruiseDataSub = new Subject<any>();
  currentselectedCruiseData = this.selectedCruiseDataSub.asObservable();

  constructor(private http: HttpClient) { }

  updateData(data: any) {
    this.selectedCruiseDataSub.next(data);
  }

  getShipCompanyList(): Observable<any> {
      return this.http.get(this.apiUrl + "GetShipCompanyList");

  }

  getShipListByCompany(companyId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('ShipCompanyId',companyId);
    return this.http.get(this.apiUrl + "GetShipListByShipCompanyId", {params: params})
        .pipe(catchError(this.handleError));
   }

  getShipItineraryDatesList(shipCompanyName: string, shipName: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ShipCompanyName',shipCompanyName);
    params = params.append('ShipName',shipName);
    return this.http.get(this.apiUrl + "GetShipItineraryDatesList", {params: params})
        .pipe(catchError(this.handleError));
  }

  getRegions(): Observable<any> {
    return this.http.get(this.apiUrl + "GetRegions")
        .pipe(catchError(this.handleError));
  }

  getPorts(region: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('region',region);
    return this.http.get(this.apiUrl + "GetPorts", {params: params})
        .pipe(catchError(this.handleError));
  }

  getAvailableDatesByPort(port: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('port',port);
    console.log(port);
    return this.http.get(this.apiUrl + "GetAvailableDatesByPort", {params: params})
      .pipe(catchError(this.handleError));
  }

  getShipItineraryDates(shipCompanyId: number, shipId: number) : Observable<any> {
    let params = new HttpParams();
    params = params.append('shipCompanyId', shipCompanyId);
    params = params.append('shipId', shipId);
    return this.http.get(this.apiUrl + "GetShipItineraryDates", {params: params})
        .pipe(catchError(this.handleError));
  }

  getTourInventoryListByCruise(shipCompanyId: number, shipId: number, refId: string, bookingDate: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('Type', 'cruise');
    params = params.append('ShipCompanyId', shipCompanyId);
    params = params.append('ShipId', shipId);
    params = params.append('RefId', refId);
    if( bookingDate !== '' &&  bookingDate !== undefined  && bookingDate !== null) {
      params = params.append('BookingDate', bookingDate);
    }
    return this.http.get(this.apiUrl + "GetTourInventoryList", {params: params})
        .pipe(catchError(this.handleError));
  }

  getTourInventoryListByPort(portId: number, bookingDate: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('Type', 'port');
    params = params.append('PortId', portId);
    params = params.append('BookingDate', bookingDate);
    return this.http.get(this.apiUrl + "GetTourInventoryList", {params: params})
      .pipe(catchError(this.handleError));
  }

  getShipItineraryDatesByRefId(refId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('refId', refId);
    return this.http.get(this.apiUrl + "GetShipItineraryDatesByRefId", {params: params})
      .pipe(catchError(this.handleError));
  }

  getTourDetail(tourInventoryID: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('tourInventoryID', tourInventoryID);
    return this.http.get(this.apiUrl + "GetTourInventoryDetail", {params: params})
      .pipe(catchError(this.handleError));
  }

  //  getTourTimes():Observable<any> {
  //    return this.http.get("https://api.cruisecode.com/TourInventory/GetTourInventoryTimeList?CompanyId=72aca93d-62a8-48e8-abf5-9814dc7604ae&TourId=5&ShipId=2&BookingDate=2023-06-15")
  // }

  getTourReviews(tourId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('tourId', tourId);
    return this.http.get(this.apiUrl + "GetTourReviewList", {params: params})
      .pipe(catchError(this.handleError));
    // return this.http.get("https://api.cruisecode.com/TourInventory/GetTourReviewList?");
  }

  getTourReviewCount(tourId: number): Observable<any> {
     let params = new HttpParams();
    params = params.append('tourId', tourId);
    return this.http.get(this.apiUrl + "GetTourReviewCount", {params: params})
      .pipe(catchError(this.handleError));
    // return this.http.get("https://api.cruisecode.com/TourInventory/GetTourReviewCount?tourId=3");
  }

  getTourDetail1(tourId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('tourId', tourId);
    return this.http.get(this.apiUrl + "GetTour", {params: params})
      .pipe(catchError(this.handleError));
    //  return this.http.get("https://api.cruisecode.com/TourInventory/GetTour?tourId=5");
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(error.message));
  }
}
