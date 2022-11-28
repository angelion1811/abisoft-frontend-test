import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BaseComponent } from './components/base/base.component';
import { ItemComponent } from './components/item/item.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { RegisterComponent } from './components/register/register.component';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonComponent } from './components/person/person.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BaseComponent,
    ItemComponent,
    ReportsComponent,
    ItemEditComponent,
    ItemAddComponent,
    RegisterComponent,
    PersonAddComponent,
    PersonEditComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    //materials Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,
    //Forms Modules
    FormsModule,
    ReactiveFormsModule,
    //charts modules
    NgChartsModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    //{ provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
