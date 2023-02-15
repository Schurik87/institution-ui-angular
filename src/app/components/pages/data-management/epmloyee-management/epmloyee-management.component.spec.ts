import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmloyeeManagementComponent } from './epmloyee-management.component';

describe('EpmloyeeManagementComponent', () => {
  let component: EpmloyeeManagementComponent;
  let fixture: ComponentFixture<EpmloyeeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EpmloyeeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpmloyeeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
