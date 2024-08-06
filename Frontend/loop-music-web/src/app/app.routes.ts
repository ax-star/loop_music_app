import { Routes } from '@angular/router';
import { ProductionsTableComponent } from './modules/artists/components/productions-table/productions-table.component';
import { PlaybackControllerComponent } from './modules/consumers/components/playback-controller/playback-controller.component';
import { LiveBackgroundComponent } from './modules/consumers/components/live-background/live-background.component';

export const routes: Routes = [
    {
        path: 'artists',
        pathMatch: 'full',
        component: ProductionsTableComponent
    },
    {
        path: '',
        pathMatch: 'full',
        component: PlaybackControllerComponent
    },
    {
        path: 'background',
        pathMatch: 'full',
        component: LiveBackgroundComponent
    }
];
