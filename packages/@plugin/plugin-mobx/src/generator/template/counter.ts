import { makeAutoObservable } from "mobx";

class CounterStore {
  number = 0; // ✅ 加上这句，让它成为 observable 属性

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.number += 1;
  }
}

export const store = new CounterStore();
