# YouTubeTV TikTok Style

This react project preloads YouTube video's so that you can zap tiktok style: immediate playbacks! You can write a program like this:
```
[
    {
        "start": 100,
        "end": 102,
        "id": "hOIQw0glxbI"
    },
    {
        "start": 100,
        "end": 102,
        "id": "yRDivUb5EeA"
    }
]
```
Will show two video's 2 seconds per video and immediate change/start of the next one!  

You'll find a program in the assets folder.

## Installation

```
git clone git@github.com:wimdenherder/youtubetv.git
cd youtubetv
npm install
npm run start
```

You don't need any api keys to run the program.

## Helper scripts

If you want to check if youtube id's still work, you can use the following script: `src/helper/ytExists.js`  

The other script `src/helper/mapSheetToJson.js` is a helper script to get the youtube id's and times from a list of urls.