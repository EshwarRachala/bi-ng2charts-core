/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LineChartComponent } from '../src/linechart/linechart.component';

describe('LinechartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LineChartComponent
      ],
    });
    TestBed.compileComponents();
  });

 it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(LineChartComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
    .toContain('Line Chart');
  }));
});
