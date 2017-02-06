import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestService } from './services/rest.service';

declare var $: any
@Component({
    moduleId: module.id,
    selector: "ques3",
    templateUrl: "../../templates/q3.html",
    styleUrls: ["../../public/css/q3.css"]
})

export class Ques3Component implements OnInit{
public form:FormGroup;
    public resultA: any[]=[];
    public resultB: any[]=[];
    public resultC: any[]=[];
    public maxA: number = -1;
    public maxB: number = -1;
    public maxC: number = -1;
    mode = 'Observable';

    constructor(
        private router: Router,
        public fb: FormBuilder,
        private el: ElementRef,
        public restService: RestService
    ){};
    ngOnInit(): void{
        this.restService.getTopComicsByCharacter({limit: 30}).subscribe(res=>{
            this.resultA = res;
            res.forEach(r=> this.maxA = r.count > this.maxA ?r.count: this.maxA)
        });
        this.restService.getTopComicsByAlias({limit: 30}).subscribe(res=>{
            this.resultB= res;
            res.forEach(r=> this.maxB = r.count > this.maxB ?r.count: this.maxB)
        });
        this.restService.getTopCharactersByComic({limit: 30}).subscribe(res=>{
            this.resultC = res;
            res.forEach(r=> this.maxC = r.count > this.maxC ?r.count: this.maxC)
        });
        this.form = new FormGroup({
          input: new FormControl('', [<any>Validators.required]),
          op: new FormControl('or')
        })
    }
}
