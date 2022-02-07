const axios = require('axios');
const data = require('../assets/ytIds.json');
const credentials = require('../credentials/apikey.json'); // get this from google cloud console
const fs = require('fs');

async function videoExists(id) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${credentials.apikey}`;
  const response = await axios.get(url)
  return response.data.items.length > 0;
}

async function filterExisting(data) {
  let promises = data.map(x => videoExists(x.id));
  const videosExists = await Promise.all(promises);
  const existingData = data.filter((x,index) => videosExists[index]);
  console.log('existingData',existingData, existingData.length);
  console.log('nonexisting videos ' + (data.length - existingData.length));
  fs.writeFileSync('./assets/ytIdsExisting.json', JSON.stringify(existingData));
}

filterExisting(data.slice(0,2));