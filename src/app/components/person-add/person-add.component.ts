import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private personService:PersonService, private router:Router,public dialogRef: MatDialogRef<PersonAddComponent>,) { }

  ngOnInit(): void {
    this.initForm();
  }

  addPerson(){
    if(this.formGroup.valid){
      this.personService.addPerson(this.formGroup.value).subscribe(result =>{
        if(result.id){
          window.location.reload();
          this.dialogRef.close();
        }
        if(result.message){
          alert(result.message);
        }
      });
    }
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      registered: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

}
