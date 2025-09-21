export interface Edge {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly weight: number;
  readonly directed: boolean;
  readonly attributes?: Record<string, any>;
}
