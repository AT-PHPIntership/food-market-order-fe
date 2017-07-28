import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // title = 'app works!';
  // @ViewChild('nameInput') name: ElementRef;
  //
  // sayHello() {
  //   alert('Hello World!');
  //   this.name.nativeElement.focus();
  // }
}
