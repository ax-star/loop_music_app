import { Request, Response } from 'express';
import fs from 'fs';

export const streamSong = async (req: Request, res: Response) => {
    const filePath = './data/music/Lying Together.mp3';

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stats.size
        });

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('close', function () {
            // console.log(res.writableEnded);
        });
    });

    // const stat = fs.statSync(filePath);
    // res.writeHead(200, {
    //     'Content-Type': 'audio/mpeg',
    //     'Content-Length': stat.size
    // });
    // fs.createReadStream(filePath).pipe(res);
    

    // fs.stat(filePath, (err, stats) => {
    //     if (err) {
    //         console.error(err);
    //         res.writeHead(404, {'Content-Type': 'text/plain'});
    //         res.end('File not found');
    //         return;
    //     }

    //     const range = req.headers.range;
    //     const fileSize = stats.size;
    //     const chunkSize = 1024 * 1024;
    //     const start = Number(range?.replace(/\D/g, ""));
    //     const end = Math.min(start + chunkSize, fileSize - 1);

    //     const headers = {
    //         "Content-Type": "audio/mpeg",
    //         "Content-Length": end - start,
    //         "Content-Range": "bytes " + start + "-" + end + "/" + fileSize,
    //         "Accept-Ranges": "bytes",
    //     };
    //     res.writeHead(206, headers);
      
    //     const rstream = fs.createReadStream(filePath, {start: start, end: end});
    //     rstream.pipe(res);
    // });
}