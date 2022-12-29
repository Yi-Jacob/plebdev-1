import { Component } from '@angular/core';
import { TourInventoryService } from '../../services/tour-inventory.service';
import { tap } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent {
  constructor(private tourInventoryService: TourInventoryService, private _Activatedroute:ActivatedRoute) {}
  id!: number;
  tour: any;
  tourDetail: any;
  events: any[] = [];
  reviewCount: any;
  isShown: boolean = false;
  images: any[] = [];
  availableTimes: any;
  value1: string = '';
  tourDate: any;
  tourPricing: any = FormGroup;

  activeState: boolean[] = [false, false, false];

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  adultTotal: number = 2;
  childTotal: number = 0;
  infantTotal: number = 0;
  adultPrice: number = 0;
  childPrice: number = 0;
  priceTotal: any = null;
  tourId: number = 0;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '960px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  toggleShow() {
    this.isShown = !this.isShown;
  }

  ngOnInit() {
    // this.tourInventoryService
    //   .getTourDetail(5)
    //   .pipe(
    //     tap((val) => {
    //       this.tour = val.data;
    //       this.events = val.data.tourItineraryList;
    //       this.images = val.data.tourImageList;
    //     })
    //   )
    //   .subscribe();
    this.id=this._Activatedroute.snapshot.params["id"];
   // alert(this.id);
    this.tourInventoryService
      .getTourDetail(this.id)
      .pipe(
        tap((val) => {
          // this.tour = val.data;
          this.tourId = val.data.tourID
          this.tourDetail = val.data;
          this.tourDate = val.data.tourInventoryDate
           this.availableTimes = val.data.tourInventoryTime
          console.log(val.data);
           console.log(val.data.tourInventoryTime);
           this.tourInventoryService
      .getTourDetail1(this.tourId)
      .pipe(
        tap((val) => {
           this.tour = val.data;
          this.events = val.data.tourItineraryList;
          this.images = val.data.tourImageList;
          console.log(val.data);
        })
      )
      .subscribe();
      this.tourInventoryService
      .getTourReviewCount(this.tourId)
      .pipe(
        tap((val) => {
          this.reviewCount = val.data;
        })
      )
      .subscribe();
        })

      )
      .subscribe();

    // this.tourInventoryService
    //   .getTourReviewCount(5)
    //   .pipe(
    //     tap((val) => {
    //       this.reviewCount = val.data;
    //     })
    //   )
    //   .subscribe();

      // this.tourInventoryService
      // .getTourDetail1(1)
      // .pipe(
      //   tap((val) => {
      //     // this.tourDetail = val.data;
      //     // this.tourDate = val.data.tourInventoryDate
      //   })
      // )
      // .subscribe();

      // this.tourInventoryService
      // .getTourTimes()
      // .pipe(
      //   tap((val) => {
      //     this.availableTimes = val.data
      //   })
      // )
      // .subscribe();

    this.tourPricing = new FormGroup({
      adultTotal: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      childTotal: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      infantTotal: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      subTotal: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      time: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      tourId: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      tourDate: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
  }

   ngAfterContentChecked() {
     this.tourPricing.controls['tourId'].setValue(this.tourId);
    this.tourPricing.controls['tourDate'].setValue(this.tourDate);
    this.tourPricing.controls['time'].setValue(this.availableTimes);
    this.subTotal()
  }

  subTotal(): number {
    return (this.priceTotal =
      this.tour.adultPrice * this.adultTotal + this.tour.childPrice * this.childTotal);
  }

  addToCart() {
    if (this.tourPricing.invalid) {
      console.log(this.tourPricing);
      console.log(2);
    } else if (this.tourPricing.valid) {
      console.log(this.tourPricing);
    } else {
      console.log(this.tourPricing);
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
