import app from './app';
import mongoose from 'mongoose';
import config from './config';
import mm from 'mongodb-migrations';
import migrations from './migrations';

// Run migrations
let migrator = new mm.Migrator({
  "url": config.mongo.url,
  "directory": "./src/migrations"
});
migrator.bulkAdd(migrations);
migrator.migrate(() => {});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url, { useMongoClient: true })
  .then(()    => console.log('connected to DB'))
  .catch(err  => console.log(err));

app.listen(3000, () => {
  console.log("api server started on port 3000");
});
