import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GradientFlow';
  constructor(private router: Router) {
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  navigateToRoute() {
      console.log('Before navigation');
      this.router.navigate(['/my-route']);
      console.log('After navigation');
  }

}
