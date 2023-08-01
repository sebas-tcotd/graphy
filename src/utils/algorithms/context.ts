import { AlgorithmStrategy } from "./interface";

export class GraphContext {
  private algorithmStrategy!: AlgorithmStrategy;

  public setAlgorithmStrategy(strategy: AlgorithmStrategy) {
    this.algorithmStrategy = strategy;
  }

  public executeAlgorithm() {
    this.algorithmStrategy.execute();
  }
}
