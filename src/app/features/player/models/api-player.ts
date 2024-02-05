import { ApiTeam } from "./api-team";

export interface ApiPlayer {
    id: number;
    first_name: string;
    height_feet: string;
    height_inches: string;
    last_name: string;
    position: string;
    team: ApiTeam;
    weight_pounds: string;
}
