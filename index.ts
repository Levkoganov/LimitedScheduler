import { LimitedScheduler } from "./limitedScheduler";
import { task } from "./task";

const scheduler = new LimitedScheduler(3);
const tasks = [task(1, 1000), task(2, 2000), task(3, 3000), task(4, 4000)];

for (const task of tasks) {
  scheduler.run(task);
}
