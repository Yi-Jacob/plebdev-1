import { Component } from '@angular/core';
import { TourInventoryService } from 'src/app/features/services/tour-inventory.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-tour-reviews',
  templateUrl: './tour-reviews.component.html',
  styleUrls: ['./tour-reviews.component.css'],
})
export class TourReviewsComponent {
  reviews: any[] = [];
  rating: number = 5;
   isShown: boolean = false;
   showMore: boolean = false;

  constructor(private tourInventoryService: TourInventoryService) {}
  ngOnInit() {
    this.tourInventoryService
    .getTourReviews(7)
      .pipe(
        tap((val) => {
          this.reviews = val.data;
          this.reviews.map((item: any)=> ({
                        ...item,
                        isShown:false
                      }))
        })
      )
      .subscribe();

  }

    toggleShow() {
    this.isShown = !this.isShown;
  }
}
