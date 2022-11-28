import { PersonService } from './../../services/person.service';
import { PersonAddComponent } from '../person-add/person-add.component';
import { PersonEditComponent } from '../person-edit/person-edit.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edad', 'fecha de nacimiento', 'fecha de inscripcion', 'costo', 'Actions'];
  items = [];
  dialogConfig:any = {
    width: '50%',
    enterAnimationDuration: '3000ms',
    exitAnimationDuration:'1500ms'
  };
  constructor(private personService:PersonService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.personService.getPersonsAll().subscribe(result => {
      this.items = result;
    });
  }

  toggleAddItem(){
    this.dialog.open(PersonAddComponent, this.dialogConfig);
  }

  toggleEditItem(data:any) {
    this.dialog.open(PersonEditComponent, {
      ...this.dialogConfig,
      data: data
    });
  }

  deleteItem(element:any){
    this.personService.deletePerson(element?.id??'').subscribe(result=>{
      if(result?.message == "Ok")
        window.location.reload();
    })
  }
}
