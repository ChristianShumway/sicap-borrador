import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder } from '@angular/forms';
import {  MatCheckboxChange } from '@angular/material';
import { AuthorizedProfile } from './../../../../shared/models/authorizedProfile';
import { PerfilesService } from '../../../../shared/services/perfiles.service';

@Component({
  selector: 'app-modal-perfiles',
  templateUrl: './modal-perfiles.component.html',
  styleUrls: ['./modal-perfiles.component.scss']
})
export class ModalPerfilesComponent implements OnInit {

  authorizedProfileList: AuthorizedProfile[] = [];
  authorizedProfileListSelected: AuthorizedProfile[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalPerfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public profiles) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.authorizedProfileList =this.profiles;
    // this.getValidations(this.data);
    // console.log(this.flds);
  }

  onProfileChange(list){
    this.authorizedProfileListSelected = list.selectedOptions.selected.map(item => item.value);
  }


}
