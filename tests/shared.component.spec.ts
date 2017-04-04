/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SharedComponent } from '../src/shared.component';

describe('SharedComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SharedComponent
      ],
    });
    TestBed.compileComponents();
  });

 it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(SharedComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sample component');
  }));
});
