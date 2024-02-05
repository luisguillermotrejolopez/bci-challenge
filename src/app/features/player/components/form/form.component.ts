import { Component, OnInit, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataManagementService } from '../../services/util/data-management.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public title!: string;
  private _dataManagerService: DataManagementService = inject(DataManagementService);
  public playerForm!: FormGroup;
  public playerExists!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) private player: Player
  ) { }

  ngOnInit() {
    this.setTitle();
    this.initializeForm();
  }

  private setTitle(): void {
    this.title = this.player ? 'Actualizar' : 'Registrar';
  }
  
  private initializeForm(): void {
    this.playerForm = this.formBuilder.group({
      name: [this.player ? this.player.name : '', [Validators.required, Validators.maxLength(20)]],
      lastName: [this.player ? this.player.lastName : '', [Validators.required, Validators.maxLength(20)]],
      city: [this.player ? this.player.city : '', [Validators.required, Validators.maxLength(20)]],
      division: [this.player ? this.player.division : '', [Validators.required, Validators.maxLength(20)]]
    })
  }

  public send(): void {
    const formPlayer: Player = this.playerForm.value;

    if (!this.player) {
      this.playerExists = this._dataManagerService.savePlayer(formPlayer);
    } else {
      this.playerExists = this._dataManagerService.updatePlayer(this.player, formPlayer);
    }

    if (!this.playerExists) {
      this.closeDialog();
    }
  } 
  
  private closeDialog(): void {
    this.dialogRef.close();
  }

}
