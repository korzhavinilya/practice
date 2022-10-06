import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Client from './client.entity';

@Entity()
class Role {
  @PrimaryGeneratedColumn('uuid')
  role_uid: string;

  @Column()
  name: string;

  @ManyToMany(() => Client, (client) => client.roles)
  @JoinTable({ name: 'ClientRole', joinColumn: 'client_uid' })
  clients: Client[];
}

export default Role;
