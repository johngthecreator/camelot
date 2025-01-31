"use client"
import { useState } from "react";
export default function AudioAnalyser(props:{ audioBlob:Blob | null }){
    const [audioData, setAudioData] = useState<number[]>([]);
  
    const getAudioFeatures = () => {
      if (!props.audioBlob) return;

      const fftSize = 8192;
  
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      const bandpassFilter = audioContext.createBiquadFilter();
        bandpassFilter.type = "bandpass";
        bandpassFilter.frequency.value = 1500;
        bandpassFilter.Q.value = 1.5;

        const highPassFilter = audioContext.createBiquadFilter();
        highPassFilter.type = "highpass";
        highPassFilter.frequency.value = 300;

        const lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = "lowpass";
        lowPassFilter.frequency.value = 3000;
        
        const compressor = audioContext.createDynamicsCompressor();
        compressor.threshold.value = -20; // Start compressing above -20 dB
        compressor.knee.value = 30;
        compressor.ratio.value = 4; // Moderate compression
        compressor.attack.value = 0.1;
        compressor.release.value = 0.2;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;

      const sampleRate = audioContext.sampleRate;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let source: AudioBufferSourceNode;
      let rafId: number;

      const processAudio = async () => {
        if (props.audioBlob == null) return;
        const arrayBuffer = await props.audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        let frequencyArray:number[] = [];

        // adding filters to make vocals more prominant
        source.connect(highPassFilter);
        highPassFilter.connect(lowPassFilter);
        lowPassFilter.connect(bandpassFilter);
        bandpassFilter.connect(compressor);
        compressor.connect(analyser);

        // Python Sample
        // C4 is middle C, C5 is an octave higher
        // def freq_to_note(freq):
        //     if freq == 0:
        //         return None
        //     note_number = 12 * math.log2(freq / 440) + 69
        //     note_number = round(note_number)
        //     notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        //     return notes[note_number % 12] + str(note_number // 12 - 1)

        // # Your frequency array
        // freqs = [0, 1042.97, 1048.83, 521.48, 1458.98, 1453.13, 884.77, 1054.69, 1400.39, 1166.02, 1183.59, 662.11, 667.97, 1324.22, 1318.36, 873.05, 878.91, 1171.88, 1376.95, 1388.67, 1230.47, 1283.2, 1037.11, 1300.78, 1576.17, 1330.08, 1335.94, 1500, 1125, 1148.44, 1177.73, 1201.17, 591.8, 984.38, 1564.45, 779.3, 785.16, 1160.16, 1154.3, 1195.31, 890.63, 1617.19, 1611.33, 1593.75, 1587.89, 1031.25, 1025.39, 1570.31, 2085.94, 1476.56, 2320.31, 2091.8, 1781.25, 1423.83, 1417.97, 644.53, 1007.81, 1306.64, 1535.16, 1558.59, 1652.34, 1312.5, 1646.48, 1640.63, 1634.77, 656.25, 990.23, 1605.47, 1582.03, 1552.73, 1441.41, 1880.86, 1845.7, 1775.39, 2150.39, 2144.53, 972.66, 1740.23, 574.22, 580.08, 978.52, 1957.03, 1962.89, 533.2, 585.94, 603.52, 1429.69, 1435.55, 697.27, 1769.53, 515.63, 773.44, 1816.41, 1488.28, 1470.7, 1746.09, 1189.45, 914.06, 908.2, 1072.27]

        // notes = [freq_to_note(f) for f in freqs]
        // print(notes)

        // analyser.connect(audioContext.destination);
        source.start();
        
        const tick = () => {
          analyser.getByteFrequencyData(dataArray);
          const UI8DataArray = new Uint8Array(dataArray);
          // find max bin and return index
          const maxIndex = UI8DataArray.indexOf(Math.max(...UI8DataArray));
          // find frequency
          const frequency = maxIndex * sampleRate / fftSize
          frequencyArray.push(parseFloat(frequency.toFixed(2)))
          rafId = requestAnimationFrame(tick);
        };
        tick();

        source.onended = () => {
            setAudioData([...new Set(frequencyArray)] as number[])
            cancelAnimationFrame(rafId);
            analyser.disconnect();
            source.disconnect();
            audioContext.close();
        };
      };
  
      processAudio();

      return () => {
        cancelAnimationFrame(rafId);
        analyser.disconnect();
        source?.disconnect();
        audioContext.close();
      };
    };

    console.log(audioData)

    return <div>
        <button onClick={getAudioFeatures}>Get Features</button>
        {JSON.stringify(audioData)}
    </div>;
  };
  