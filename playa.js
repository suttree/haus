// import { Scale, createMotif } from 'playa';

import pkg from 'playa';
const { Scale, createMotif } = pkg;

import Tone from 'tone';


const scale = new Scale('A', Scale.Major);

var test = createMotif(scale.notes, ['4n', '2n', '8nt']);
console.log(JSON.stringify(test))

/* =>
[
    { time: 0, dur: 480, next: 480, midi: 73, note: 'C#4', isRest: false },
    { time: 480, dur: 960, next: 1440, midi: 80, note: 'G#4', isRest: false },
    { time: 1440, dur: 160, next: 1600, midi: 74, note: 'D4', isRest: false }
]
*/

function createSynth() {
    const synth = new Tone.PolySynth(Tone.DuoSynth);
    const volume = new Tone.Volume(-12).toDestination();
    const panner = new Tone.Panner(0);
    const reverb = new Tone.Reverb({
        decay: 4,
        wet: 0.4,
        preDelay: 0.15
    });

    reverb.generate();

    const feedbackDelay = new Tone.FeedbackDelay("8n", 0.3)

    synth.set({
        voice0: {
            oscillator: {
                type: "triangle4"
            },
            volume: -10,
            envelope: {
                attack: 0.01,
                release: 0.1,
                sustain: 1
            }
        },
        voice1: {
            volume: -6,
            envelope: {
                attack: 0.005,
                release: 0.2,
                sustain: 1
            }
        }
    });

    synth.chain(panner, feedbackDelay, reverb, volume);

    return synth;
}

function play() {
    Tone.Transport.start('+0.01');
}

const synth = createSynth();
const rhythm = Rhythm.free('1:0:0', ['4n', '8n']);
const arp = createArp(new Scale('G4', Scale.Aeolian), [1, 6, 3, 5, 3, 2], rhythm);

const part = new Tone.Part((time, value) => {
if (value.isRest) return;

Tone.Draw.schedule(() => {
    partProgress.value = part.progress;
}, time);

synth.triggerAttackRelease(value.note, value.dur, time, Math.random() * 0.5 + 0.5);
}, arp.map(toToneEvent)).start(0);

part.loop = true;
part.loopEnd = '1:0:0';
