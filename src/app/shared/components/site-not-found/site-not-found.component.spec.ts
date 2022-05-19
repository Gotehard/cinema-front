import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNotFoundComponent } from './site-not-found.component';

describe('SiteNotFoundComponent', () => {
  let component: SiteNotFoundComponent;
  let fixture: ComponentFixture<SiteNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
