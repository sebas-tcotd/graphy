import { AlgorithmStrategy } from "./interface";

export class AlgorithmContext {
  private algorithmStrategy!: AlgorithmStrategy;

  public setStrategy(strategy: AlgorithmStrategy) {
    this.algorithmStrategy = strategy;
  }

  public executeAlgorithm() {
    this.algorithmStrategy.execute();
  }
}
