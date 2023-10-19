import { Task, User } from './models';

const userTask = Task.belongsTo(User);

Task.create(
  {
    title: 'First task',
    description: 'The very first task',
    user: { userId: 'stefano' }
  },
  {
    include: [{ association: userTask }]
  }
);
