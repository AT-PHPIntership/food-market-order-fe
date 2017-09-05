import { Component, OnInit } from '@angular/core';
import {PaginationService} from "../../service/pagination.service";

@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.css']
})
export class ListfoodComponent implements OnInit {

  constructor(private pagination: PaginationService) { }

  ngOnInit() {
  }

}
