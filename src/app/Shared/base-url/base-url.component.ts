import { Component } from '@angular/core';




@Component({
  selector: 'app-base-url',
  templateUrl: './base-url.component.html',
  styleUrls: ['./base-url.component.css']
})
export class BaseUrlComponent {

BaseUrlLogin = "https://localhost:5130/api/Login"

BaseUrlRoles = "https://localhost:5130/api/Roles"

BaseUrlUser = "https://localhost:5130/api/User"


}
