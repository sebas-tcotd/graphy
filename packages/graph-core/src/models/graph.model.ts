import { Edge } from './edge.model';
import { Node } from './node.model';

export type NodeMap = Map<string, Node>;
export type EdgeMap = Map<string, Edge>;

export interface Graph {
  readonly id: string;
  readonly nodes: NodeMap;
  readonly edges: EdgeMap;
  readonly directed: boolean;
}
