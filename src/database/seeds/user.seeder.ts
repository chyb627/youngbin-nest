import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { SeederFactoryManager, Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: 'test@test.com',
        name: 'test',
        password: '12345678',
      },
    ]);
  }
}
