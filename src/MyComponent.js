import './styles.css';
import React from 'react';
import audio1 from './sounds/heavySatKit/808MidColor.wav';
import audio2 from './sounds/heavySatKit/808SmoothC05.wav';
import audio3 from './sounds/heavySatKit/Clap808SatB03.wav';
import audio4 from './sounds/heavySatKit/Maracas808Color13.wav';
import audio5 from './sounds/heavySatKit/OH808SatA06.wav';
import audio6 from './sounds/heavySatKit/SD808Classic06.wav';
import audio7 from './sounds/heavySatKit/SD808MPC60Snap.wav';
import audio8 from './sounds/heavySatKit/TomMid808SatB09.wav';
import audio9 from './sounds/heavySatKit/RimShot808Dark03.wav';

import audio101 from './sounds/cleanCutKit/BD808MidColorA05.wav';
import audio102 from './sounds/cleanCutKit/BD808Noise01.wav';
import audio103 from './sounds/cleanCutKit/Clap808Color03.wav'
import audio104 from './sounds/cleanCutKit/Cowbell808ColorShort03.wav'
import audio105 from './sounds/cleanCutKit/MaracasB808Tape.wav'
import audio106 from './sounds/cleanCutKit/SD808CrispB02.wav'
import audio107 from './sounds/cleanCutKit/SDB808TapeToneC06.wav'
import audio108 from './sounds/cleanCutKit/TomHiA80808.wav'
import audio109 from './sounds/cleanCutKit/TomMidA80808.wav'

import song1 from './sounds/Songs/pasoori.mp3'
import song2 from './sounds/Songs/PehliNazarMein.mp3';

import background1 from './backgrounds/fuji.jpg';
import background2 from './backgrounds/snowForest.jpg';
import background3 from './backgrounds/lighthouse.jpg';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleVolume = this.handleVolume.bind(this);
        this.handlePower = this.handlePower.bind(this);
        this.handleBank = this.handleBank.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleSong = this.handleSong.bind(this);
        this.handleSongVol = this.handleSongVol.bind(this);
        this.songRef1 = React.createRef();
        this.songRef2 = React.createRef();
        this.state = {
            isPlaying: false,
            volume: 0.5,
            bank: 0,
            power: true,
            display: 'Rock \'n Roll',
            songNo: 1,
            songVolume: 0.4
        }
    }

    handleDisplay(e) {
        this.setState((state) => {
            return {...state, display: e.target.id}
        })

    }

    handleBank() {
        this.setState((state) => {
            return {
                ...state,
                bank: state.bank === 1 ? 0 : 1,
                display: state.bank === 1 ? 'Heavy Saturation Kit' : 'Clean Cut Kit'
            }
        })
        const bank = document.querySelector('.bank');
        if (this.state.bank === 1) {
            bank.style.justifyContent = 'left';
        } else {
            bank.style.justifyContent = 'right';
        }
    }

    handlePower() {
        this.setState((state) => {
            return {...state, power: !this.state.power, display: this.state.power ? 'Power Off' : 'Power On'}
        })
        const power = document.querySelector('.power');
        if (this.state.power) {
            power.style.justifyContent = 'left';
        } else {
            power.style.justifyContent = 'right';
        }
    }

    handleVolume(e) {
        const slider = e.target;
        this.setState((state) => {
            return {...state, volume: slider.value, display: 'Volume: ' + Math.round(slider.value * 100)}
        })
    }

    handleSongVol(e) {
        const slider = e.target.value;
        this.setState((state) => {
            return {...state, songVolume: slider, display: 'Volume: ' + Math.round(slider * 100)}
        })
        this.songRef1.current.volume = this.state.songVolume;
        this.songRef2.current.volume = this.state.songVolume;
    }

    handleSong() {
        const body = document.body; // for changing backgrounds
        this.setState((state) => {
            return {
                ...state,
                songNo: (state.songNo + 1) % 3

            }
        });
        const songNo = document.querySelector('.songs');
        if (this.state.songNo === 1) {
            body.style.background = `url(${background3}) center/cover no-repeat`;
            songNo.style.justifyContent = 'center';
            this.setState((state) => {
                return {...state, display: 'Pasoori.mp3'}
            })
            this.songRef2.current.load();
            this.songRef1.current.play();
        } else if (this.state.songNo === 2) {
            body.style.background = `url(${background2}) center/cover no-repeat`;
            songNo.style.justifyContent = 'right';
            this.setState((state) => {
                return {...state, display: 'PhliNazarM.mp3'}
            })
            this.songRef1.current.load();
            this.songRef2.current.currentTime = 4;
            this.songRef2.current.play();
        } else {
            body.style.background = `url(${background1}) center/cover no-repeat`;
            songNo.style.justifyContent = 'left';
            this.setState((state) => {
                return {...state, display: 'Songs Off'}
            })
            this.songRef1.current.load();
            this.songRef2.current.load();
        }
    }

    handlePlay(event) {
        // adding and removing the active status
        event.target.classList.add('active');
        setTimeout(function () {
            event.target.classList.remove('active');
        }, 550)


        if (this.state.power) {
            let sound;
            // choosing the bank
            if (this.state.bank === 1) {
                sound = event.target.querySelector('.flip');
            } else {
                sound = event.target.querySelector('.clip');
            }
            sound.volume = this.state.volume;
            if (this.state.isPlaying === true) {
                sound.load()
            }
            sound.play().catch((err) => {
                console.log(err)
            });
            this.setState((state) => {
                return {...state, isPlaying: true}
            })
        }
        this.handleDisplay(event);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
        this.songRef1.current.volume = this.state.songVolume;
        this.songRef2.current.volume = this.state.songVolume;

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        const key = e.key.toUpperCase();
        if (key === 'ARROWRIGHT') {
            if (this.state.volume <= 0.9) {
                this.setState((state) => {
                    return {
                        ...state,
                        volume: state.volume + 0.1,
                        display: 'Volume: ' + Math.round((state.volume + 0.1) * 100)
                    }
                })
            }
        } else if (key === 'ARROWLEFT') {
            if (this.state.volume >= 0.1) {
                this.setState((state) => {
                    return {
                        ...state,
                        volume: state.volume - 0.1,
                        display: 'Volume: ' + Math.round((state.volume - 0.1) * 100)
                    }
                })
            }
        } else if (key === 'ARROWUP') {
            if (this.state.songVolume < 1) {
                this.setState((state) => {
                    return {
                        ...state,
                        songVolume: (state.songVolume * 10 + 0.1 * 10) / 10,
                        display: 'Volume: ' + Math.round((state.songVolume * 10 + 1) * 10)
                    }
                })

            }
            this.songRef1.current.volume = this.state.songVolume
            this.songRef2.current.volume = this.state.songVolume
        } else if (key === "ARROWDOWN") {
            if (this.state.songVolume >= 0.1) {
                this.setState((state) => {
                    return {
                        ...state,
                        songVolume: (state.songVolume * 10 - 0.1 * 10) / 10,
                        display: 'Volume: ' + Math.round((state.songVolume - 0.1) * 100)
                    }
                })
            }
            this.songRef1.current.volume = this.state.songVolume
            this.songRef2.current.volume = this.state.songVolume
        } else if (key === 'P') {
            this.handlePower();
        } else if (key === 'B') {
            this.handleBank();
        } else if (this.state.power) {
            const sound = document.getElementById(key);
            if (sound) {
                this.handlePlay({target: sound.parentNode});
            }
        }
    }

    render() {
        return (
            <div id="drum-machine">
                <div id='drum-keys'>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='MidColor'>
                        <audio src={audio1} className='clip' autoPlay id='Q'></audio>
                        Q
                        <audio src={audio101} className='flip' autoPlay></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='Smooth'>
                        <audio src={audio2} id='W' className='clip'></audio>
                        W
                        <audio src={audio102} className='flip' autoPlay
                        ></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='Clap'>
                        <audio src={audio3} id='E' className='clip'></audio>
                        E
                        <audio src={audio103} className='flip' autoPlay
                        ></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='Maracas'>
                        <audio src={audio4} id='A' className='clip'></audio>
                        A
                        <audio src={audio104} className='flip' autoPlay></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='OH808SatA06'>
                        <audio src={audio5} id='S' className='clip'></audio>
                        S
                        <audio src={audio105} className='flip' autoPlay></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='SD808Classic06'>
                        <audio src={audio6} id='D' className='clip'></audio>
                        D
                        <audio src={audio106} className='flip' autoPlay></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='SD808MPCSnap'>
                        <audio src={audio7} id='Z' className='clip'></audio>
                        Z
                        <audio src={audio107} className='flip' autoPlay></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='TomMid808'>
                        <audio src={audio8} id='X' className='clip'></audio>
                        X
                        <audio src={audio108} className='flip' autoPlay></audio>
                    </div>
                    <div className='drum-pad glow' onClick={this.handlePlay} id='RimShot808'>
                        <audio src={audio9} id='C' className='clip'></audio>
                        C
                        <audio src={audio109} className='flip' autoPlay></audio>
                    </div>
                </div>
                <div id='drum-controls'>
                    <h3> Power</h3>
                    <div className='on-btn power' onClick={this.handlePower}>
                        <div className='on-btn-switch-on'></div>
                    </div>
                    <div id='display' className='glow'>{this.state.display}
                    </div>
                    <h3>Volume</h3>
                    <input id='slider' className='custom-range' type="range" min='0' max='1' value={this.state.volume}
                           step='0.1'
                           onChange={this.handleVolume}/>
                    <h3> Bank</h3>
                    <div className='on-btn bank' onClick={this.handleBank}>
                        <div className='on-btn-switch-on'></div>
                    </div>
                    <h3> Songs</h3>
                    <div className='on-btn songs' id='songNo' onClick={this.handleSong}>
                        <div className='song-switch'></div>
                        <audio src={song1} ref={this.songRef1} id='song1' loop></audio>
                        <audio src={song2} ref={this.songRef2} id='song2' loop></audio>
                    </div>
                    <input id='volSlider' className='custom-range' type="range" min='0' max='1'
                           value={this.state.songVolume} step='0.1'
                           onChange={this.handleSongVol}/>
                </div>
            </div>
        );
    }
}

export default MyComponent;
