import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'web-audio-component',
  templateUrl: './web-audio-component.component.html',
  styleUrls: ['./web-audio-component.component.css']
})
export class WebAudioComponent implements OnInit {

  private context!: AudioContext;
  public buttonStatus: String = 'Play';
  public loadingAudio: boolean = false;
  public playbackStopped: boolean = false;
  private audioBuffer!: AudioBuffer;

  private source!: AudioBufferSourceNode;
  
  constructor() { }

  ngOnInit(): void {

    AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    this.context = new AudioContext();


      // Tap into navigator.media devices to catch device-change events...
    if (typeof navigator.mediaDevices === 'undefined' )
    {
      console.log ("navigator mediaDevices api not defined on this system");
    }
    else 
    {
      console.log ("navigator mediaDevices api is supported on this system");

      const constraints = {
        audio: true
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(() => {

          navigator.mediaDevices.ondevicechange = (event) => {
            console.log(
              'Now navigator mediaDevices ondevicechange works',
              event
            );
          };

          if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
          } else {
    
            let audioDevices: string[] = [];
            let ndx: number = 0;
      
              // List audio output devices
            navigator.mediaDevices
              .enumerateDevices()
              .then((devices) => {
                devices.forEach((device) => {
    
                  console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                  if (device.kind === 'audiooutput') {
    
                    audioDevices[ndx++] = device.deviceId;
                  }
                });
    
                if (ndx === 0) {
                  console.log("No audiooutput devices were enumerated.");
                }
    
              })
              .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
              });
          }
        })
        .catch((err) => {
          console.log(`${err.name}: ${err.message}`);
        });   

    }

    this.loadingAudio = true;
    this.fetchAudio()
        .then(audioBuffer => {
            this.loadingAudio = false;
            console.log("Audio file loaded");
            this.audioBuffer = audioBuffer;

            this.playbackStopped = true;
          })
        .catch(error =>  {
          console.log("Caught exception :" + error);
        });  
  }

  fetchAudio(): Promise<AudioBuffer> {

    //set the audio file's URL
    var audioURL="assets/audio/Her Majesty.mp3";

    return fetch(audioURL)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            return new Promise((resolve, reject) => {
                this.context.decodeAudioData(
                    buffer,
                    resolve,
                    reject
                );
            })
        });
  }

  togglePlaying = () => {
    
    if (this.playbackStopped) {

      this.startPlayback();
    }
    else {

        if(this.context?.state === 'running') {
          this.context.suspend().then(() => {
            console.log('paused playback');
            this.buttonStatus = "Play";
          });
        }
        else if(this.context?.state === 'suspended') {
          this.context.resume().then(() => {
            console.log('resume playback');
            this.buttonStatus = "Pause";
          });
        }
      }
  }

  stopPlaying = () => {

    if ((this.context?.state === 'running') || 
    (this.context.state === 'suspended')) {

      console.log('stopping playback');
      this.source.stop();
      this.source.disconnect();
      this.playbackStopped = true;
    }
  }

  onPlaybackEnd() {
   
    this.source.disconnect();
    this.playbackStopped = true;
    console.log('playback finished');
  }

  startPlayback() {

        let bufferSource = this.context.createBufferSource();
        bufferSource.buffer = this.audioBuffer;
        bufferSource.connect(this.context.destination);
        bufferSource.start();
        this.playbackStopped = false;
        this.source = bufferSource;
        this.buttonStatus = "Pause";
        console.log('starting playback');
  }

}
