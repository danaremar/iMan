import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './services/authentication/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'iman-desktop-app';

  constructor(private tokenService: TokenService, private toastr: ToastrService, private router: Router) { }

  private isExpiredToken(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp
    return (Math.floor((new Date).getTime() / 1000)) >= expiry
  }

  ngOnInit() {
    const token = this.tokenService.getToken()

    if (token == null) {
      this.router.navigate(["/login"])
    } else if (token && this.isExpiredToken(token)) {
      this.tokenService.logOut();
      this.toastr.error("Expired session")
      this.reload()
    } else {
      this.router.navigate(["/app/effort"])
    }

    Aos.init({
      offset: 30,
      duration: 1500
    })
  }

  reload() {
    window.location.reload()
  }
}
