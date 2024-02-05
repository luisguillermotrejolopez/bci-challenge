import { Injectable } from '@angular/core';

import { ApiPlayer } from '../../models/api-player';
import { Player } from '../../models/player';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  public nbaPlayers!: Player[];

  constructor() { }

  public formatPlayers(players: ApiPlayer[]): void {
    this.nbaPlayers = players.map(function(player: ApiPlayer) {
      return {
        name: player.first_name,
        lastName: player.last_name,
        city: player.team.city,
        division: player.team.division
      };
    });
  }

  public savePlayer(player: Player): boolean {
    const playerIndex: number = this.getPlayerIndex(player);
    if (playerIndex === -1) { 
      this.nbaPlayers.push(player);
      return false;
    } else {
      return true;
    }
  }

  public updatePlayer(oldPlayer: Player, newPlayer: Player): boolean {
    const oldPlayerIndex: number = this.getPlayerIndex(oldPlayer);
    const newPlayerIndex: number = this.getPlayerIndex(newPlayer);
    if (newPlayerIndex === -1 || this.comparePlayers(oldPlayer, newPlayer)) {
      this.nbaPlayers[oldPlayerIndex] = newPlayer;
      return false;
    } else {
      return true;
    }
  }

  private getPlayerIndex(player: Player): number {
    const indexPlayer: number = this.nbaPlayers.findIndex((savedPlayer: Player) => {
      return this.comparePlayers(savedPlayer, player);
    });

    return indexPlayer;
  }

  private comparePlayers(savedlayer: Player, newPlayer: Player): boolean {
    return savedlayer.name === newPlayer.name 
      && savedlayer.lastName === newPlayer.lastName 
      && savedlayer.city === newPlayer.city 
      && savedlayer.division === newPlayer.division;
  }

  public deletePlayer(player: Player): void {
    const playerIndex: number = this.getPlayerIndex(player);
    this.nbaPlayers.splice(playerIndex, 1);
  }
}
