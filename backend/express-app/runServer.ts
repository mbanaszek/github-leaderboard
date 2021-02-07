import { app } from './app';

const PORT = process.env.PORT || 8001;

app.listen(PORT, async () => {
    console.log(`Go to http://localhost:${PORT}/`);
});
