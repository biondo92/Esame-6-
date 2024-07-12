import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebarBrandComponent } from './app-sidebar-brand.component';

describe('AppSidebarBrandComponent', () => {
  let component: AppSidebarBrandComponent;
  let fixture: ComponentFixture<AppSidebarBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSidebarBrandComponent]
    });
    fixture = TestBed.createComponent(AppSidebarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
