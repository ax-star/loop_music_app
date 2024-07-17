import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Colorimetry } from './Colorimetry';
import { Artist } from './Artist';
import { Album } from './Album';

@Entity()
export class Song extends BaseEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column() name!: string;

    @Column() thumbnailPath!: string;

    @Column() picturePath!: string;

    @Column() filePath!: string;

    @OneToOne(() => Colorimetry)
    @JoinColumn()
    colorimetry!: Colorimetry;

    @ManyToMany(() => Album, (album) => album.songs)
    albums!: Album[];

    @ManyToMany(() => Artist, (artist) => artist.songs)
    artists!: Artist[];
}