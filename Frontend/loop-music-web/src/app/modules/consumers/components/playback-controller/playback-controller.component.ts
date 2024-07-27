import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AudioService } from '../../../../core/services/audio.service';
import { faCoffee, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { StreamState } from '../../../../shared/models/stream-state';

@Component({
  selector: 'app-playback-controller',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './playback-controller.component.html',
  styleUrl: './playback-controller.component.css'
})
export class PlaybackControllerComponent {

  state!: StreamState;

  // (Legacy)
  volumeAudio: number;

  constructor (
    public audioService: AudioService,
    public library: FaIconLibrary
  ) {
    audioService.getStreamState().subscribe(state => {
      this.state = state;
      console.log(JSON.stringify(state));
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

}
