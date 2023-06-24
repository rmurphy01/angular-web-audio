import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAudioComponent } from './web-audio-component.component';

describe('WebAudioComponent', () => {
  let component: WebAudioComponent;
  let fixture: ComponentFixture<WebAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
