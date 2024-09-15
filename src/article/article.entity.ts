import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  sourceURL: string;

  @Column('text', { nullable: true })
  sourceAudioURL?: string;

  @Column('text')
  sourceImageURL: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('date')
  publishedTime: Date;

  @Column('text')
  content: string;
}
