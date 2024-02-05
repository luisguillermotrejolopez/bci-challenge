import { Component, Inject, OnInit, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataManagementService } from '../../services/util/data-management.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-confirmation-delete',
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.scss']
})
export class ConfirmationDeleteComponent implements OnInit {

  private _dataManagerService: DataManagementService = inject(DataManagementService);

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private player: Player
  ) { }

  ngOnInit(): void { }

  public deletePlayer(): void {
    this._dataManagerService.deletePlayer(this.player);
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close('Confirmation');
  }

}
