import { getTestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ItemService } from 'src/app/services/item.service';
import { TestService } from 'src/app/services/test.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private itemService:ItemService, private userService:UserService, private testService:TestService) { }

  displayedColumnsGeneral: string[] = ['usuario', 'equipo','ipv4','resultado', 'fecha'];
  //pensaba cambiar las colulmunas (motivo por el cual uso variables distintas)
  displayedColumnsUsuario: string[] = ['usuario', 'equipo','ipv4','resultado', 'fecha'];
  users=[];
  foods = [];
  user_id=0;
  items=[];
  item_id=0;
  tests_by_user = {};
  tests_by_user_data = [];
  tests_to_item = {};
  tests_to_item_data = [];
  tests = [];
  tests_data = [];

  ngOnInit(): void {
    this.getAllItem();
    this.getAllUser();
    this.getTests();
  }

  getAllUser() {
    this.userService.getUsersAll().subscribe(result=>{
      this.users = result;
      if(result.length > 0){
        this.user_id = this.users[0]['id'];
      }
    })
  }

  getAllItem(){
    this.itemService.getIteamsAll().subscribe(result=>{
      this.items = result;
      if(result.length > 0){
        this.item_id = this.items[0]['id'];
      }
    });
  }

  getTests(){
    this.testService.getTests().subscribe(result=>{
      this.tests = result;
      this.tests_data = result.data;
    });
  }

  getTestsByUser(){
    this.tests_by_user_data = [];
    this.testService.getTestsByUser(this.user_id).subscribe(result=>{
      this.tests_by_user_data = [];
      this.tests_by_user_data = result.data;
      this.tests_by_user = result;
    });
  }

  getTestsToItem(item_id:any){
    this.tests_to_item_data = [];
    this.testService.getTestsToItem(item_id).subscribe(result=>{
      this.tests_to_item_data = [];
      this.tests_to_item_data = result.data;
      this.tests_to_item = result;
    })
  }

}
