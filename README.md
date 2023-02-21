# Welcome to s3-media-server 
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-10.15.3-blue.svg)
![Prerequisite](https://img.shields.io/badge/npm-6.4.1-blue.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/erdemkosk/quiz_api#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/erdemkosk/quiz_api/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/erdemkosk/quiz_api)](https://github.com/erdemkosk/quiz_api/blob/master/LICENSE)
[![Twitter: erdemkosk](https://img.shields.io/twitter/follow/erdemkosk.svg?style=social)](https://twitter.com/erdemkosk)

> Aws s3 based media server for uploading file fastest way and streaming on it.

## Demo

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Qir4seehtvU/0.jpg)](https://www.youtube.com/watch?v=Qir4seehtvU)

![alt text](https://i.imgur.com/1jKjaAp.png)
![alt text](https://i.imgur.com/TUsp3G8.png)

## Endpoints

| Urls                                             | Type | Params                             | Aim                                     |
|--------------------------------------------------|------|------------------------------------|-----------------------------------------|
| http://localhost:4000/api/upload                 | POST | body -> file                       | Upload a file to s3 with partial update |
| http://localhost:4000/api/stream/file-list       | GET  | -                                  | Retrive uploaded mp4 formatted items    |
| http://localhost:4000/api/stream?fileName=blabla | GET  | header -> range , query-> fileName | Streaming endpoint for selected s3 file |

## Prerequisites

- node 10.15.3
- npm 6.4.1

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Mustafa Erdem Köşk**

* Website: http://www.erdemkosk.com
* Twitter: [@erdemkosksk](https://twitter.com/erdemkosksk)
* Github: [@erdemkosk](https://github.com/erdemkosk)
* LinkedIn: [@erdemkosk](https://linkedin.com/in/erdemkosk)


## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2023 [Mustafa Erdem Köşk <erdemkosk@gmail.com>](https://github.com/erdemkosk).
