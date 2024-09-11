import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('date')
  publishedTime: Date;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  audioURL?: string;
}
