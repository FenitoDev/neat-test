const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;

  const targetPath = './src/environments/environment.ts';

  require('dotenv').config({
    path: 'src/environments/.env',
  });

  const envConfigFile = `export const environment = {
  production: false,
  apiUrl: '${process.env['API_URL']}',
  firebaseApiKey: '${process.env['FB_API_KEY']}',
  firebaseAuthDomain: '${process.env['FB_AUTH_DOMAIN']}',
  firebaseProjectId: '${process.env['FB_PROJECT_ID']}',
  firebaseStorageBucket: '${process.env['FB_STORAGE_BUCKET']}',
  firebaseMessagingSenderId: '${process.env['FB_MESSAGING_SENDER_ID']}',
  firebaseAppId: '${process.env['FB_APP_ID']}',
  firebaseMeasurementId: '${process.env['FB_MEASUREMENT_ID']}',
};
`;
  console.info(
    'The file `environment.ts` will be written with the following content: \n'
  );
  writeFile(targetPath, envConfigFile, (err: Error) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.info(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
