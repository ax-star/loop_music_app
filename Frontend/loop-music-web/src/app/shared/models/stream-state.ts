export interface StreamState {

    playing: boolean; // indicates if there is any audio playing

    readableCurrentTime: string; // human-readable current time of playing audio

    readableDuration: string; // human-readable duration of the current audio

    duration: number | undefined; // the duration of current audio in milliseconds

    currentTime: number | undefined; // the current time of audio in milliseconds

    canplay: boolean; // indicates if can be played the selected audio or not

    error: boolean; // indicates if an error occurred while playing audio or not

    ended: boolean; // indicates if the end of the media was reached  
}
