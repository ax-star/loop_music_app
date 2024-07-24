import { Component, signal, Signal } from '@angular/core';
import { AudioService } from '../../../../core/services/audio.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPause, faPlay, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { AudioState } from '../../../../shared/models/enums';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  /**
   * ADVICE!
   * This player does NOT contemplate the use of physical keyboard to play/pause the audio.
   * Next experiments aim to implement event-driven solution to audio control management,
   * hopefully that would cover the case mentioned above...
   */

  isPlaying: boolean;
  mainControlIcon!: IconDefinition;

  volumeAudio: number;

  constructor (
    public audioService: AudioService,
    public library: FaIconLibrary
  ) {
    this.volumeAudio = audioService.getVolume() * 100;
    library.addIcons(faCoffee, faPause, faPlay);

    this.isPlaying = false;
    this.updateMainControlIcon();
  }

  switchAudioControl() {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
    this.isPlaying = !this.isPlaying;
    this.updateMainControlIcon();
  }

  updateMainControlIcon() {
    if (this.isPlaying) {
      this.mainControlIcon = faPause;
    } else {
      this.mainControlIcon = faPlay;
    }
  }

  changeVolumeAudio() {
    this.audioService.setVolume(this.volumeAudio / 100);
  }

}
