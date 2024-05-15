import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const TextBox = () => {
    const [text, setText] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [audioData, setAudioData] = useState<Blob | null>(null);

    useEffect(() => {
        const synth = window.speechSynthesis;

        const updateVoiceList = () => {
            setVoices(synth.getVoices());
        };

        synth.addEventListener('voiceschanged', updateVoiceList);
        updateVoiceList();

        return () => {
            synth.removeEventListener('voiceschanged', updateVoiceList);
        };
    }, []);

    const Daniel = voices.find((voice) => voice.name === 'Daniel');
    const Alex = voices.find((voice) => voice.name === 'Alex');
    const Samantha = voices.find((voice) => voice.name === 'Samantha');
    const Tessa = voices.find((voice) => voice.name === 'Tessa');

    const availableVoices = [Alex, Daniel, Tessa, Samantha].filter((voice) => voice !== undefined) as SpeechSynthesisVoice[];

    const speakText = () => {
        if (speaking) return

        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        setSpeaking(true);
        utterance.onend = () => {
            setSpeaking(false);
            // Capture the audio data when speech synthesis is finished
            const audioData = new Blob([new Uint8Array()]);
            setAudioData(audioData);
        };
        synth.speak(utterance);
    };

    const exportAudio = () => {
        if (audioData) {
            // Create a URL for the audio blob and trigger download
            const audioUrl = URL.createObjectURL(audioData);
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = 'converted_audio.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="w-full h-full rounded-lg flex flex-col gap-1 ">
            <h2 className="text-xl font-medium">Text</h2>
            <textarea
                className="w-full h-full bg-gray-100 rounded-lg p-4 text-black text-lg resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type text here..."
                rows={6}
                cols={50}
            />
            <div>
                <label htmlFor="voices">Select Voice:</label>
                <select
                    id="voices"
                    value={selectedVoice?.name || ''}
                    onChange={(e) => {
                        const selectedVoiceName = e.target.value;
                        const voice = voices.find((v) => v.name === selectedVoiceName);
                        setSelectedVoice(voice || null);
                    }}
                >
                    {availableVoices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
                </select>
            </div>
            <Button onClick={speakText} disabled={!text || speaking}>
                {speaking ? 'Converting' : 'Convert'}
            </Button>
            <Button onClick={exportAudio} disabled={!audioData}>
                Export Audio
            </Button>
        </div>
    );
};

export default TextBox;
