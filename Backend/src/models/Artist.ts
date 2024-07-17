import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./Album";
import { Song } from "./Song";

@Entity()
export class Artist extends BaseEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column() name!: string;

    @Column() thumbnailPath!: string;
    
    @Column() picturePath!: string;

    @ManyToMany(() => Album, (album) => album.artists)
    @JoinTable({
        name: 'artist_album'
    })
    albums!: Album[];

    @ManyToMany(() => Song, (song) => song.artists)
    @JoinTable({
        name: 'artist_song'
    })
    songs!: Song[];
}