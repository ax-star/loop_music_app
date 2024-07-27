import { Routes } from '@angular/router';
import { ProductionsTableComponent } from './modules/artists/components/productions-table/productions-table.component';
import { PlaybackControllerComponent } from './modules/consumers/components/playback-controller/playback-controller.component';

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
    }
];
