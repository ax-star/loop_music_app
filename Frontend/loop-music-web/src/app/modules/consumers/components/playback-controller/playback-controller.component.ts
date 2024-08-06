import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AudioService } from '../../../../core/services/audio.service';
import { faCoffee, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { StreamState } from '../../../../shared/models/stream-state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playback-controller',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './playback-controller.component.html',
  styleUrl: './playback-controller.component.css'
})
export class PlaybackControllerComponent implements OnDestroy {

  private stateStream!: Subscription;
  state!: StreamState;

  // (Legacy)
  volumeAudio: number;

  constructor (
    public audioService: AudioService,
    public library: FaIconLibrary
  ) {
    this.stateStream = audioService.getStreamState().subscribe({
      next: (data) => {
        this.state = data;
        console.log(this.state);
      },
      error: (error) => console.error(error),
      complete: () => console.log('AudioService has finished playing audio.')
    });

    library.addIcons(faCoffee, faPause, faPlay, faStop);
    
    // (Legacy)
    this.volumeAudio = audioService.getVolume() * 100;
  }

  controlAudio() {
    if (this.state.playing) {
      this.audioService.pause();
    } else {
      if (!this.state.canplay) {
        this.audioService.stream().subscribe();
      }
      this.audioService.play();
    }
  }

  seekToAudio(change: Event) {
    let target = change.target as HTMLInputElement;
    this.audioService.seekTo(Number(target.value));
  }

  stopAudio() {
    this.audioService.stop();
    this.audioService.stream().subscribe();
  }

  changeVolumeAudio() {
    this.audioService.setVolume(this.volumeAudio / 100);
  }


  ngOnDestroy(): void {
    this.stateStream.unsubscribe();
  }

}
