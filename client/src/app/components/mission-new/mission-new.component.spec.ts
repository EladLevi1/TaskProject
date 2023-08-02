import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionNewComponent } from './mission-new.component';

describe('MissionNewComponent', () => {
  let component: MissionNewComponent;
  let fixture: ComponentFixture<MissionNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissionNewComponent]
    });
    fixture = TestBed.createComponent(MissionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
