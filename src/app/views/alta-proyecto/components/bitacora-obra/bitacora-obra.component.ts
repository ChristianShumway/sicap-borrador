import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bitacora-obra',
  templateUrl: './bitacora-obra.component.html',
  styleUrls: ['./bitacora-obra.component.scss']
})
export class BitacoraObraComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe( (data: Params) => {
      console.log(data);
    });

   
  }

}
