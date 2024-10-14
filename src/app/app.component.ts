import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() { }

  title = 'connectFest';
  theme: string | null = null;

  ngOnInit(): void {
    this.theme = localStorage.getItem('theme');
    if (this.theme) {
      document.body.classList.add(this.theme);
    } else {
      this.theme = 'light';
      document.body.classList.add(this.theme);
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(this.theme);
  }

}
