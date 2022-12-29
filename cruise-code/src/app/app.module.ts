import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchToursComponent } from './features/components/search-tours/search-tours.component';
import { TourInventoryService } from './features/services/tour-inventory.service';
import { SignInUpComponent } from './Identity/sign-in-up/sign-in-up.component';
import { ResetPasswordComponent } from './Identity/reset-password/reset-password.component';
import { EditProfileComponent } from './Identity/edit-profile/edit-profile.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from 'primeng/card';
import { TourInventoryListComponent } from './features/components/tour-inventory-list/tour-inventory-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from 'primeng/rating';
import {ListboxModule} from 'primeng/listbox';
import {DividerModule} from 'primeng/divider';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import {GalleriaModule} from 'primeng/galleria';
import {TimelineModule} from 'primeng/timeline';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AccordionModule} from 'primeng/accordion';
import {InputNumberModule} from 'primeng/inputnumber';
import { CruiseItineraryComponent } from './features/components/cruise-itinerary/cruise-itinerary.component';
import { TourDetailsComponent } from './features/components/tour-details/tour-details.component';
import { TourReviewsComponent } from './features/components/tour-details/tour-reviews/tour-reviews.component';
import { HomeComponent } from './features/components/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    SearchToursComponent,
    TourInventoryListComponent,
    CruiseItineraryComponent,
    TourDetailsComponent,
    TourReviewsComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    TagModule,
    GalleriaModule,
    TimelineModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    RatingModule,
    ListboxModule,
    DividerModule,
    ScrollPanelModule,
    SelectButtonModule,
    AccordionModule,
    InputNumberModule
    //MatCalendarCellCssClasses
  ],
  providers: [TourInventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
