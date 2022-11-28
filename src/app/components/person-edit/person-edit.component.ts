import { PersonService } from './../../services/person.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  id=0;
  formGroup: FormGroup;
  constructor(private personService:PersonService,
    private router:Router,
    public dialogRef: MatDialogRef<PersonEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.id = this.data.id??0;
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.name??'', [Validators.required]),
      last_name: new FormControl(this.data.last_name??'', [Validators.required]),
      age: new FormControl(this.data.age??'', [Validators.required]),
      birthday: new FormControl(this.data.birthday??'', [Validators.required]),
      registered: new FormControl(this.data.registered??'', [Validators.required]),
      price: new FormControl(this.data.price??'', [Validators.required]),
    });
  }

  editPerson(){
    if(this.formGroup.valid){
      this.personService.editPerson(this.id, this.formGroup.value).subscribe(result =>{
        if(result.id){
          this.dialogRef.close();
          window.location.reload();
        }
        if(result.message){
          alert(result.message);
        }
      });
    }
  }

}
