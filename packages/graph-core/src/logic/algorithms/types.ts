export interface DijkstraResult {
  readonly distance: number;
  readonly path: string[];
  readonly nodesVisited: number;
}
