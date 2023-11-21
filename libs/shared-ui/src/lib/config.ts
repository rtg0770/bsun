import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  googleMapsJsApiKey: process.env['GOOGLEMAPSJS_API_KEY'],
};
