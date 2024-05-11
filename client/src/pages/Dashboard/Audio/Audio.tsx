import { useRef, useState } from "react";
import WaveForm from "./WaveForm";

const Audio = () => {
    const [audioUrl, setAudioUrl] = useState();
    const [analyzerData, setAnalyzerData] = useState(null);
    const audioElmRef = useRef(null);

    const audioAnalyzer = () => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyzer = audioCtx.createAnalyser();
        analyzer.fftSize = 2048;

        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const source = audioCtx.createMediaElementSource(audioElmRef.current);
        source.connect(analyzer);
        source.connect(audioCtx.destination);
        source.onended = () => {
            source.disconnect();
        };

        setAnalyzerData({ analyzer, bufferLength, dataArray });
    };

    const onFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAudioUrl(URL.createObjectURL(file));
        audioAnalyzer();
    };

    return (
        <div className="flex flex-col gap-4" >
            <div className="h-[40px] flex justify-around items-center ">
                <input title='Audio' type="file" accept="audio/*" onChange={onFileChange} />
                <audio src={audioUrl ?? ""} controls ref={audioElmRef} />
            </div>
            <div className="relative z-[200000] px-4 " >
                {analyzerData && <WaveForm analyzerData={analyzerData} />}
            </div>
        </div>
    );
}

export default Audio