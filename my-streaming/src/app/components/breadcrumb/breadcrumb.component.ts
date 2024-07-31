import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  title!: string;
  breadcrumbItems: BreadcrumbItem[] = [
    {
      url: "/",
      title: "Home"
    }
  ];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        let path = this.router.url
          .split("/")

        this.breadcrumbItems = [
          {
            url: "/",
            title: "Home"
          }
        ];

        path.forEach(p => {
          if (p !== undefined && p !== "undefined" && p != "") {
            this.breadcrumbItems.push(new BreadcrumbItem(p, p[0]?.toUpperCase() + p.substr(1).toLowerCase()))
          }
        })

        let raw = path.at(-1) || "Home";

        this.title = raw[0]?.toUpperCase() + raw.substr(1).toLowerCase();
      });
  }
}

export class BreadcrumbItem {
  public url!: string
  public title!: string

  /**
   *
   */
  constructor(url: string, title: string) {
    this.url = url
    this.title = title
  }
}