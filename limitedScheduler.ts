type task = () => Promise<unknown>;

class LimitedScheduler {
  limit: number;
  activeTasks: number;
  taskQueue: task[];

  constructor(limit: number) {
    this.limit = limit;
    this.activeTasks = 0;
    this.taskQueue = [];
  }

  async run(task: task) {
    if (this.activeTasks < this.limit) {
      return this.#executeTask(task);
    } else {
      this.taskQueue.push(() => this.#executeTask(task));
    }
  }

  async #executeTask(task: task) {
    return new Promise(async (resolve, reject) => {
      this.activeTasks++;

      try {
        const result = await task();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.activeTasks--;
        this.#checkQueue();
      }
    });
  }

  async #checkQueue() {
    if (this.taskQueue.length > 0) {
      const nextTask = this.taskQueue.shift();
      if (nextTask) return nextTask();
    }
  }
}

export { LimitedScheduler };
