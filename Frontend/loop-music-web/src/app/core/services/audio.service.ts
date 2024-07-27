import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StreamState } from '../../shared/models/stream-state';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio(); // The audio object that will reproduce the sound.
  private lastVolume!: number; // The previous value of audio.volume after any change.

  private audioEvents: Array<string> = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ]; // List of some events emitted by the audio property.
  private stop$ = new Subject<boolean>(); // Subtype of Observable used to notify when the audio stream must stop.
  private streamState!: StreamState; // Data managed to control and monitor the audio streaming.
  private streamChange!: BehaviorSubject<StreamState>; // Subtype of Observable used to get the data of the streamState property.

  constructor() {
    this.resetStreamState(); // Initialize streamState
    this.streamChange = new BehaviorSubject(
      this.streamState
    );
  }

  // Starts streaming the audio from the url.
  private startStream(url: string): Observable<any> {
    return new Observable(observer => {
      this.audio.volume = this.lastVolume;
      this.audio.src = url;
      this.audio.load();

      const handler: EventListener = (event: Event) => {
        this.updateStreamState(event);
        observer.next(event);
      }

      this.addListeners(this.audio, this.audioEvents, handler);

      // On unsubscribing do...
      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeListeners(this.audio, this.audioEvents, handler);
        this.resetStreamState();
      }
    });
  }

  // Adds event listeners to the different events emitted by audio.
  private addListeners(audio: HTMLAudioElement, events: Array<string>, handler: EventListener) {
    events.forEach(event => {
      audio.addEventListener(event, handler);
    });
  }

  // Removes the event listeners from the different events emitted by audio.
  private removeListeners(audio: HTMLAudioElement, events: Array<string>, handler: EventListener) {
    events.forEach(event => {
      audio.removeEventListener(event, handler);
    });
  }

  // Updates the streamState property based on the event received. 
  private updateStreamState(event: Event) {
    switch (event.type) {
      case 'canplay':
        this.streamState.duration = this.audio.duration;
        this.streamState.readableDuration = this.formatTime(this.audio.duration);
        this.streamState.canplay = true;
        break;
      case 'playing':
        this.streamState.playing = true;
        break;
      case 'pause':
        this.streamState.playing = false;
        break;
      case 'timeupdate':
        this.streamState.currentTime = this.audio.currentTime;
        this.streamState.readableCurrentTime = this.formatTime(this.audio.currentTime);
        break;
      case 'error':
        this.resetStreamState();
        this.streamState.error = true;
        break;
    }
    this.streamChange.next(this.streamState);
  }

  // Resets the values of the streamState property.
  private resetStreamState() {
    this.streamState = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }


  /// PUBLIC METHODS

  // Starts the streaming of the audio.
  stream(url: string = 'http://192.168.0.100:3000/api/stream-song'): Observable<any> {
    return this.startStream(url).pipe(takeUntil(this.stop$));
  }

  // Returns an Observable of StreamState.
  getStreamState(): Observable<StreamState> {
    return this.streamChange.asObservable();
  }

  // Resumes the audio, or starts the streaming.
  play() {
    this.fadeIn();
    // this.audio.play();
  }

  // Pauses the audio.
  pause() {
    this.fadeOut();
    // this.audio.pause();
  }

  // Stops the streaming.
  stop() {
    this.stop$.next(true);
  }

  // Changes the current time of the audio.
  seekTo(seconds: number) {
    this.audio.currentTime = seconds;
  }

  // Returns the the audio's volume. (Legacy)
  getVolume(): number {
    return this.lastVolume;
  }

  // Setts the audio's volume and updates lastVolume. (Legacy)
  setVolume(newVolume: number) {
    this.lastVolume = newVolume;
    this.audio.volume = newVolume;
  }

  // Returns a humane readable time format.
  formatTime(seconds: number): string {
    let date = new Date(0);
    date.setSeconds(seconds);
    // return date.toISOString().substring(11, 19); // HH:mm:ss
    return date.toISOString().substring(14, 19); // mm:ss
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
        clearInterval(intervalId);
        this.audio.volume = 0.0;
        this.audio.pause();
      }
    }, 25);
    this.audio.volume = this.lastVolume;
  }

}