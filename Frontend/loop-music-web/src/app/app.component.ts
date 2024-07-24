import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioService } from './core/services/audio.service';
import { SongPlayerModule } from './modules/song-player/song-player.module';
import { PlayerComponent } from "./modules/song-player/components/player/player.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SongPlayerModule, PlayerComponent],
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
