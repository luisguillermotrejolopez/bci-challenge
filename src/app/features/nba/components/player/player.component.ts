import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { FormComponent } from '../form/form.component';
import { ConfirmationDeleteComponent } from '../confirmation-delete/confirmation-delete.component';
import { PlayerService } from '../../services/http/api/player.service';
import { DataManagementService } from '../../services/util/data-management.service';
import { ApiPlayer } from '../../models/api-player';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['name', 'lastName', 'city', 'division', 'options'];
  private _dataManagerService: DataManagementService = inject(DataManagementService);
  private _playerService: PlayerService = inject(PlayerService);

  public dataSource!: MatTableDataSource<Player>;

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  private dialogFormWidth: string = '250px';
  private dialogConfirmationWidth: string = '220px';

  constructor(public _dialog: MatDialog) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getDataApi();
  }

  private getDataApi(): void {
    this._playerService.getNbaPlayers().then((players: ApiPlayer[]) => {
      this._dataManagerService.formatPlayers(players);

      this.translatePaginator();
      this.setDataDource();
    });
  }

  private translatePaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Anterior página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setDataDource(): void {
    this.dataSource = new MatTableDataSource(this._dataManagerService.nbaPlayers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openDialogRegister(): void {
    const dialogRef = this._dialog.open(FormComponent, {
      width: this.dialogFormWidth
    });
    
    this.subscribeDialogCloseEvent(dialogRef);
  }

  public openDialogUpdate(player: Player): void {
    const dialogRef = this._dialog.open(FormComponent, {
      width: this.dialogFormWidth,
      data: player
    });

    this.subscribeDialogCloseEvent(dialogRef);
  }

  public openDialogConfirmation(player: Player): void {
    const dialogRef = this._dialog.open(ConfirmationDeleteComponent, {
      width: this.dialogConfirmationWidth,
      data: player,
    });

    this.subscribeDialogCloseEvent(dialogRef);
  }

  private subscribeDialogCloseEvent(dialogRef: any): void {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.setDataDource();
      }
    });
  }

}
