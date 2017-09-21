import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-dailymenu',
  templateUrl: './home-dailymenu.component.html',
  styleUrls: ['./home-dailymenu.component.css']
})
export class HomeDailymenuComponent implements OnInit {

  sub: any;
  data: any;
  constructor(private route: ActivatedRoute,
              private apiService: APIService) {
    this.data = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let today, dd, mm, yyyy, current_date;
      today = new Date();
      dd = today.getDate().toString();
      mm = (today.getMonth() + 1).toString();
      yyyy = today.getFullYear().toString();
      current_date = yyyy + '-' + mm + '-' + dd;
      let url;
      url = `${environment.hostname}/api/daily-menus/${current_date}`;
      this.apiService.apiGet(url).subscribe(data => {
        this.data = data.data;
      });
    })
  }

}
