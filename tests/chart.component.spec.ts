import { ChartComponent } from '../src/chart.component';


describe('Chart without the TestBed', () => {
    let chart: ChartComponent;
    beforeEach(() => {
        let ele = document.createElement('div');
        ele.innerHTML = `<div #target class="areachart"><div>`;
        document.getElementsByTagName('head')[0].appendChild(ele);
        chart = new ChartComponent(ele);
    });
    
    it('Chart should be Instantiated', () => {
        expect(chart).toBeDefined();
    });

});
