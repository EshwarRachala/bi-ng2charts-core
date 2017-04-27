import { Injectable } from '@angular/core';
import * as d3 from 'd3';


@Injectable()
export class D3Service {
    public width: number;
    public height: number;
    public margin: { top: number; right: number; bottom: number; left: number; };

    constructor() { }

    d3Module() {
        return d3;
    }

}
