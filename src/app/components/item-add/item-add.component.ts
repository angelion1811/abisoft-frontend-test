import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private itemService:ItemService, private router:Router,public dialogRef: MatDialogRef<ItemAddComponent>,) { }

  ngOnInit(): void {
    this.initForm();
  }

  addItem(){
    if(this.formGroup.valid){
      this.itemService.addItem(this.formGroup.value).subscribe(result =>{
        console.log(result);
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
      ipv4: new FormControl('', [Validators.required]),
    });
  }

}
