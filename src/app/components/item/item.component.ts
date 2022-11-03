import { TestService } from './../../services/test.service';
import { ItemAddComponent } from './../item-add/item-add.component';
import { ItemEditComponent } from './../item-edit/item-edit.component';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  displayedColumns: string[] = ['name', 'ipv4', 'Actions'];
  items = [];
  dialogConfig:any = {
    width: '50%',
    enterAnimationDuration: '3000ms',
    exitAnimationDuration:'1500ms'
  };
  constructor(private itemService:ItemService, private testService:TestService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.itemService.getIteams().subscribe(result => {
      this.items = result.data;
    });
  }

  toggleAddItem(){
    this.dialog.open(ItemAddComponent, this.dialogConfig);
  }

  toggleEditItem(data:any) {
    this.dialog.open(ItemEditComponent, {
      ...this.dialogConfig,
      data: data
    });
  }

  deleteItem(element:any){
    this.itemService.deleteItem(element?.id??'').subscribe(result=>{
      if(result?.message == "Ok")
        window.location.reload();
    })
  }

  ping(element:any){
    this.testService.ping({item_id: element.id??0}).subscribe(result=>{
      if(result.id){
        console.log("servicio de ping integrado");
      }
    })
  }
}
