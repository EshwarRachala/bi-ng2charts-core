/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { BarChartComponent } from '../src/barchart.component';

describe('BarChartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BarChartComponent
      ],
    });
    TestBed.compileComponents();
  });

 it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(BarChartComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
    .toContain('Bar Chart');
  }));
});
