import app from './app';

// Start the server
const server = app.listen(3000, () => {
  console.info(0, `Server is running on port 3000`);
});

export default server;
