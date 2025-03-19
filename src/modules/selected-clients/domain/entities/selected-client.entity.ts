import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('selected_clients')
export class SelectedClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  clientId: number;
}
