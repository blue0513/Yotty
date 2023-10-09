# Yotty

[![CI](https://github.com/blue0513/Yotty/actions/workflows/ci.yml/badge.svg)](https://github.com/blue0513/Yotty/actions/workflows/ci.yml)

Yotty is the tool: Quick access to your Google Calendar via Google API!

| daily | weekly |
|---|---|
| <img width="732" alt="Screenshot 2023-10-10 at 0 37 34" src="https://github.com/blue0513/Yotty/assets/8979468/c3252226-87b7-4f64-b251-9ca91e7f5e8e"> | <img width="725" alt="Screenshot 2023-10-10 at 0 37 48" src="https://github.com/blue0513/Yotty/assets/8979468/18a1bbe1-6cfb-480f-b621-c95b3fde9980"> |
 

## Setup

```shell
make setup
```

Then edit `manifest.json` to fill out `YOUR_PUBLIC_KEY` and `YOUR_CLIENT_ID`.  
See the detail in Google official docs as follow sections.

1. [Keeping a consistent extension ID](https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#keep-consistent-id)
1. [Create OAuth client ID](https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#oauth_client)
1. [Register OAuth in manifest](https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#oauth_registration)

## Usage

1. Just follow [official instruction](https://developer.chrome.com/docs/extensions/) and install this extension
1. Click the icon of Yotty!

## Shortcut

| shortcut  | action     |
|-----------|------------|
| `Alt + c` | Open popup |

## Calendar ID

You can change calendar ID (default: primary)

1. open chrome extension `Options` page
2. specify your calendar ID

## Acknowledgments

This extension uses the followings.

- [fullcalendar](https://github.com/fullcalendar/fullcalendar)
- [luxon](https://github.com/moment/luxon/)
- [tippyjs](https://github.com/atomiks/tippyjs)
