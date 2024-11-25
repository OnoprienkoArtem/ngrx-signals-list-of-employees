import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: any[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', route: '/' },
      { label: 'Employees', icon: 'pi pi-chart-line', route: '/employees' },
    ]
  }
}
