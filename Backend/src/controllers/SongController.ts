import { Request, Response } from 'express';
import fs from 'fs';

export const streamSong = async (req: Request, res: Response) => {
    const filePath = './data/music/youtube_miUhh2fKVYE_audio(Back to You).opus';

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
            return;
        }

        const range = req.headers.range;
        const fileSize = stats.size;
        const chunkSize = 1024 * 1024;
        const start = Number(range?.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, fileSize - 1);

        res.writeHead(206, {
            'Content-Type': 'audio/ogg',
            'Content-Length': end - start,
            'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
            'Accept-Ranges': 'bytes',
            'Transfer-Encoding': 'chunked', 
        });

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('close', function () {
            // console.log(data);
        });
    });
    
}