# AngularWebAudio

This project utilzes the Web Audio API to play audio in a simple web page.

This purpose of his project is to test hot-swapping an external audio output device with audio playpack in progress.

The project also tests if the mediaDevices api is available on the system, and also tests getUserDevices(), ondevicechange(),  and enumerateDevices().

Note that the availablity of mediaDevices relies upon a secure context, and that the call to getUserDevices() will initiate a user request for microphone permission.


## Steps to reproduce 

The test should involve initiating audio playback on the page.  
With audio playing, switch the output device by connecting headphones or external speaker.
Verify playback continues through the external device.
Disconnect the external output device while playback is still in progress.
Verify that playback continues through the original output device.

## Testing remote devices

Teseting remote devices requires setting up a local server.  Nginx is a simple server that works well and is easy to set up. 

NOTE:  The mediaDevices api is only available in a secure context, so it will be necessary to set up an nginx server with a self-signed certificate with openssl. 

Running an Angular app with nginx:  https://medium.com/@technicadil_001/deploy-an-angular-app-with-nginx-a79cc1a44b49
Running nginx on Mac OS: https://adamtheautomator.com/nginx-on-mac/

Setting up secure server on nginx: https://istation.atlassian.net/wiki/spaces/~449337817/pages/2037022721/Setting+up+NGINX+with+a+Self-Signed+Certificate+on+macOS+X+Big+Sur


## Known issues 

Play/Pause toggle does not reset to Play state correctly after using the Stop button. 

## Angular version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

