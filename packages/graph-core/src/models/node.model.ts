export interface Node {
  readonly id: string;
  readonly label: string;
  readonly attributes?: Record<string, any>;
}
