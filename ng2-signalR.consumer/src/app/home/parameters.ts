export class Parameters {

  aNumber: Number = 4;
  aString: string;
  aList: Array<string>;

  constructor() {
      this.aNumber = 4;
      this.aString = 'ng-be';
      this.aList = new Array<string>('jurgen', 'sam');
  }
}
