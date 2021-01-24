import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _userName: string;

  constructor() {}
  set userLogged(username: string) {
    this._userName = username;
  }

  get userLogged(): string {
    return this._userName;
  }
}
