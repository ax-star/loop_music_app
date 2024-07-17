import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./Artist";
import { Song } from "./Song";

@Entity()
export class Album extends BaseEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column() title!: string;

    @Column() thumbnailPath!: string;
    
    @Column() picturePath!: string;

    @ManyToMany(() => Artist, (artist) => artist.albums)
    artists!: Artist[];

    @ManyToMany(() => Song, (song) => song.albums)
    @JoinTable({
        name: 'album_song'
    })
    songs!: Song[];
}