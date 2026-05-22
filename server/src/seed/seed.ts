import { connectDatabase } from '../config/database';
import { UserModel } from '../models/User';
import { TaskModel } from '../models/Task';

const createSeedData = async () => {
  await connectDatabase();

  const adminExists = await UserModel.exists({ email: 'admin@taskapp.io' });
  if (!adminExists) {
    const admin = await UserModel.create({
      name: 'Admin User',
      email: 'admin@taskapp.io',
      password: 'Password123',
      role: 'admin',
    });

    await TaskModel.create([
      {
        title: 'Welcome to TaskApp',
        description: 'Use this task board to organize your priorities.',
        priority: 'High',
        status: 'Todo',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        tags: ['welcome', 'setup'],
        createdBy: admin._id,
        assignedTo: admin._id,
      },
    ]);

    console.log('Seed data created');
  } else {
    console.log('Seed data already exists');
  }
  process.exit(0);
};

createSeedData().catch((error) => {
  console.error(error);
  process.exit(1);
});
