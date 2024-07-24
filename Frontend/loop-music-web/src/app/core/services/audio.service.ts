import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeWhile } from 'rxjs';
import { AudioState } from '../../shared/models/enums'
import { StreamState } from '../../shared/models/stream-state';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio();

  /* Future
  private stop$ = new Subject();
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  }
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );
  */

  private lastVolume!: number;


  constructor() {}

  // Starts streaming the audio from the url.
  private startStream(url: string = 'http://192.168.0.100:3000/api/stream-song') {
    this.audio.src = url;
    this.audio.load();
    this.audio.volume = this.lastVolume;
    this.audio.play();
  }

  // Plays the current song, or starts the stream.
  play() {
    if (this.audio.src) {
      this.fadeIn();
    } else {
      this.startStream();
    }
  }

  // Pauses the current audio.
  pause() {
    this.fadeOut();
  }

  getVolume(): number {
    return this.lastVolume;
  }

  // Changes the audio's volume and updates lastVolume.
  setVolume(newVolume: number) {
    this.audio.volume = newVolume;
    this.lastVolume = newVolume;
  }
 
  // Plays the audio, then progressively increases the volume up to lastVolume.
  private fadeIn() {
    this.audio.volume = 0;
    this.audio.play();
    let intervalId = setInterval(() => {
      let volume = this.audio.volume + 0.05;
      if (volume <= this.lastVolume) {
        this.audio.volume = volume;
      } else {
        clearInterval(intervalId);
      }
    }, 25);
  }

  // Progressively decreases the volume up to 0, then pauses the audio.
  private fadeOut() {
    let intervalId = setInterval(() => {
      let volume = this.audio.volume - 0.05;
      if (volume >= 0) {
        this.audio.volume = volume;
      } else {
        this.audio.volume = 0.0;
        clearInterval(intervalId);
      }
    }, 25);
    this.audio.pause();
    this.audio.volume = this.lastVolume;
  }
  
}