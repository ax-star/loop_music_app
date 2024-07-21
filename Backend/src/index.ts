import app from './app';
import { AppDataSource } from './configs/db.config';

const port = 3000;

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database Connected...');

        app.listen(port, () => console.log(`App listening on port ${port}!`));
    } catch (error) {
        console.error(error);
    }
}

main();