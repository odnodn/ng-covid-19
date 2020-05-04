import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isActive = false;
  isExpand = true;
  constructor() { }

  ngOnInit(): void {
  }

  expand(): void {
    this.isActive = !this.isActive;
  }

  toggleMenu(e: any): void {
    const menu = e.currentTarget.querySelector('.navbar-dropdown');
    if (e.target.parentElement.classList.contains('navbar-dropdown')) {
      menu.style.display = 'none';
    }
    setTimeout(() => {
      menu.style.display = '';
      e.target.blur();
    }, 100);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }
}
