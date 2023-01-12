import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import Role from './role.entity';

@Entity()
class Client {
  @PrimaryGeneratedColumn('uuid')
  client_uid: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => Role, (role) => role.clients)
  roles: Role[];
}

export default Client;
