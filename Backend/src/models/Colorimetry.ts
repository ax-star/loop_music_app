import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Colorimetry extends BaseEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column() mainColor!: string;

    @Column() secondaryColor!: string;

    @Column() backgroudTone!: string;
}