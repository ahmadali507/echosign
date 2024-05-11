import { useRef, useEffect } from "react";
import useSize from "@/hooks/useSize";

interface AnalyzerData {
    dataArray: Uint8Array;
    analyzer: AnalyserNode | null;
    bufferLength: number;
}


const WaveForm: React.FC<{ analyzerData: AnalyzerData }> = ({ analyzerData, }) => {

    ///////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////////
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { dataArray, analyzer, bufferLength } = analyzerData;

    ///////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////
    const [width, height] = useSize();

    ///////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////////
    useEffect(() => {
        draw(dataArray, analyzer, bufferLength);
    }, [dataArray, analyzer, bufferLength]);

    ///////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////////
    function animateBars(analyser: AnalyserNode, canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, dataArray: Uint8Array, bufferLength: number): void {
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = "#000";

        const HEIGHT = canvas.height / 2;

        const barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * HEIGHT;
            const blueShade = Math.floor((dataArray[i] / 255) * 5); // generate a shade of blue based on the audio input
            const blueHex = ["#61dafb", "#5ac8fa", "#50b6f5", "#419de6", "#20232a"][blueShade]; // use react logo blue shades
            canvasCtx.fillStyle = blueHex;
            canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }
    ///////////////////////////////////////////////////////// COMPONENTS //////////////////////////////////////////////////////////////
    const draw = (dataArray: Uint8Array, analyzer: AnalyserNode | null, bufferLength: number): void => {
        const canvas = canvasRef.current;
        if (!canvas || !analyzer) return;
        const canvasCtx = canvas.getContext("2d");

        const animate = (): void => {
            requestAnimationFrame(animate);
            // eslint-disable-next-line no-self-assign
            canvas.width = canvas.width;
            canvasCtx!.translate(0, canvas.offsetHeight / 2 - 115);
            animateBars(analyzer, canvas, canvasCtx!, dataArray, bufferLength);
        };

        animate();
    };


    ///////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////////
    return (
        <canvas
            className="w-full "
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
};

export default WaveForm;
