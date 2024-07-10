import { Etichetta } from "./services/etichette.service";
import { Prodotto } from "./services/prodotti.service";
import { Report } from "./services/report.service";

export type SortColumn = keyof Report| keyof Etichetta | keyof Prodotto | '';
export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}