import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {


    id=0;
  formGroup: FormGroup;
  constructor(private itemService:ItemService,
    private router:Router,
    public dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.id = this.data.id??0;
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.name??'', [Validators.required]),
      ipv4: new FormControl(this.data.ipv4??'', [Validators.required]),
    });
  }

  editItem(){
    if(this.formGroup.valid){
      this.itemService.editItem(this.id, this.formGroup.value).subscribe(result =>{
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
