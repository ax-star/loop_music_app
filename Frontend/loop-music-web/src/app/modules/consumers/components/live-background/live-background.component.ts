import { AfterViewInit, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { AudioService } from '../../../../core/services/audio.service';
import { PlaybackControllerComponent } from '../playback-controller/playback-controller.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-background',
  standalone: true,
  imports: [PlaybackControllerComponent],
  templateUrl: './live-background.component.html',
  styleUrl: './live-background.component.css'
})
export class LiveBackgroundComponent implements AfterViewInit, OnDestroy {
  
  private frequencyStream!: Subscription;
  public dataArray!: Uint8Array;

  private screenHeight!: number;
  private screenWidth!: number;

  @ViewChild('canvasRef', { static: false }) canvasRef: any;
  private canvasCtx!: CanvasRenderingContext2D;
  private canvasEl!: any;

  public barWidth!: number;
  public barHeight!: number;
  public x!: number;

  constructor ( public audioService: AudioService ) {
    this.frequencyStream = audioService.getFrequencyData().subscribe((data) => {
      this.dataArray = data;
    });
  }

  private renderCanvas() {
    this.canvasEl = this.canvasRef.nativeElement;
    this.canvasCtx = this.canvasEl.getContext('2d');
    this.updateCanvasSize();
  }

  private animate() {
    this.x = 0;
    this.barWidth = this.canvasEl.width/this.dataArray.length;
    this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    for (let i = 0; i < this.dataArray.length; i++) {
      this.barHeight = this.dataArray[i];
      this.canvasCtx.fillStyle = 'white';
      this.canvasCtx.fillRect(this.x, this.canvasEl.height - this.barHeight, this.barWidth, this.barHeight);
      this.x += this.barWidth;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  updateCanvasSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.canvasEl.height = this.screenHeight;
    this.canvasEl.width = this.screenWidth;
  }

  ngAfterViewInit(): void {
    this.renderCanvas();
    this.animate();
  }

  ngOnDestroy(): void {
    this.frequencyStream.unsubscribe();
  }

}
