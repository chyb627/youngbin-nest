import * as bcrypt from 'bcryptjs';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, OneToMany } from 'typeorm';
import { Board } from './board.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];

  async validatePassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}
