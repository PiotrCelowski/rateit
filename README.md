# Getting Started with Rate.it app

### Running in dev mode
You will need `.env` file in the main directory with following properties:

REACT_APP_FIREBASE_API_KEY=""\
REACT_APP_ALGOLIA_API_KEY=""\
REACT_APP_ALGOLIA_APPLICATION_ID=""\
REACT_APP_PROFILE='dev'

Run `firebase emulators:start` followed by `npm start` 


Open [http://localhost:3000](http://localhost:3000)

### Deploying to production
You will need `.env.production` file in the main directory with following properties:

REACT_APP_FIREBASE_API_KEY=""\
REACT_APP_ALGOLIA_API_KEY=""\
REACT_APP_ALGOLIA_APPLICATION_ID=""\
REACT_APP_PROFILE='prod'

Run `npm run build-production` followed by `firebase deploy --only hosting`