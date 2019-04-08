import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.theme = 'light';
  }
  theme: string;
  getTheme() { return this.theme; }
  themeToggle() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else if (this.theme === 'dark') {
      this.theme = 'light';
    }
    console.log(`${this.theme} mode activated`);
    return this.theme;
  }
}
