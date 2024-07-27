import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioService } from './core/services/audio.service';
import { PlaybackControllerComponent } from './modules/consumers/components/playback-controller/playback-controller.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlaybackControllerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // When the browser window is about to unload its resources (before unload),
  // stores the last volume's value in the browser's local storage.
  @HostListener('window:beforeunload', [`$event`])
  private recordLastVolume() {
    let lastVolume = this.audioService.getVolume();
    localStorage.setItem('lastVolume', lastVolume.toString());
  }

  // Retrieves the last volume's value from the browser's local storage.
  private rememberLastVolume(): number {
    let lastVolume = localStorage.getItem('lastVolume') || '0.5';
    return +lastVolume;
  }

  constructor (
    public audioService: AudioService,
  ) {
    // Sends the recovered last volume's value to the AudioService. 
    audioService.setVolume(this.rememberLastVolume());
  }

}
