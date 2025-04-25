import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  funFact: string;

  @Column()
  habitat: string;

  @Column()
  region: string;

  @Column()
  size: string;

  @Column()
  weight: string;

  @Column()
  speed: string;

  @Column()
  food: string;

  @Column()
  endangered: boolean;

  @Column({ type: 'integer', nullable: true })
  icon: number;

  @Column({ type: 'integer', nullable: true })
  image: number;
}
