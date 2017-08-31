import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home-material',
  templateUrl: './home-material.component.html',
  styleUrls: ['./home-material.component.css']
})
export class HomeMaterialComponent {
  private apiUrl = 'http://laravel-foodorder.com/api/foods';
  data: any = {};

  constructor(private http: Http) {
    this.getFoods();
    this.getData();
  }
  getData() {
    return this.http.get(this.apiUrl)
        .map((res: Response) => res.json())
  }

  getFoods() {
    this.getData().subscribe(data=> {
      console.log(data);
      this.data = data;
    })
  }
}
