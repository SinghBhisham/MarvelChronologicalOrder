import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestService } from './services/rest.service';


declare var $: any
@Component({
    moduleId: module.id,
    selector: "ques1",
    templateUrl: "../../templates/q1.html",
    styleUrls: ["../../public/css/q1.css"],
    providers: [RestService]

})

export class Ques1Component implements OnInit{
    public form:FormGroup;
    public results: any[]=[];
      mode = 'Observable';

    constructor(
        private router: Router,
        public fb: FormBuilder,
        private el: ElementRef,
        public restService: RestService
    ){};
    getComics(data: any, valid: boolean): void{
        if(!valid)
            return;
        this.restService.getComicsByCharacter({op: data.op, query: data.input.toLowerCase().split(";")}).subscribe(res=>this.results=res)
    }
    ngOnInit(): void{
        //this.restService.getComicsByCharacter({op: "and", q: "captain america ii"}).subscribe(res=>this.results=res)
        this.form = new FormGroup({
          input: new FormControl('', [<any>Validators.required]),
          op: new FormControl('or')
        })
    }
}
