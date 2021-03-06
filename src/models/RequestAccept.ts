import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn,
} from 'typeorm';
import Book from './Book';
import User from './User';
import Admin from './Admin';

@Entity('requests_accepts')
class RequestAccept {
@PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_request: string;

@Column()
  id_book: string;

@ManyToOne(() => Book, { eager: true })
@JoinColumn({ name: 'id_book' })
IdBook: Book

@Column()
id_user: string;

  @ManyToOne(() => User, { eager: true })
@JoinColumn({ name: 'id_user' })
IdUser: User

  @Column()
  id_admin: string;

  @ManyToOne(() => Admin, { eager: true })
@JoinColumn({ name: 'id_admin' })
IdAdmin: Admin

@CreateDateColumn()
created_at: Date;

@Column()
message: string;

@Column()
delivered?: string;
}

export default RequestAccept;
