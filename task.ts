const task = (taskId: number, duration: number) => {
  return () =>
    new Promise((resolve) => {
      console.log(`Task ${taskId} started`);

      setTimeout(() => {
        resolve(`Task ${taskId} completed`);
      }, duration);
    });
};

export { task };
