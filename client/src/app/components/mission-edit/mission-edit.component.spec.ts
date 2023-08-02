import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionEditComponent } from './mission-edit.component';

describe('MissionEditComponent', () => {
  let component: MissionEditComponent;
  let fixture: ComponentFixture<MissionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissionEditComponent]
    });
    fixture = TestBed.createComponent(MissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
