type setPointProps = {
  point: number;
};

export default class StressPoint {
  stressPoint: number = 0;

  setPoint({ point }: setPointProps) {
    this.stressPoint += point;
  }
}
