/* eslint-disable @typescript-eslint/no-explicit-any */
/*
import { Button } from '@/components/ui/button'
import { useState } from 'react';

const TextBox = () => {
    const [text, setText] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const synth = window.speechSynthesis;
  
    const speakText = () => {
      if (synth.speaking) {
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
      };
      synth.speak(utterance);
    };
    
    /////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
    return (
        <div className="w-full h-full rounded-lg flex flex-col gap-1 ">
            <h2 className='text-xl font-medium ' >Text</h2>

        <textarea className="w-full h-full bg-gray-100 rounded-lg p-4 text-black text-lg resize-none "
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text here..."
          rows={6}
          cols={50}
        />
        <Button onClick={speakText} disabled={!text || speaking}>
          {speaking ? 'Converting' : 'Convert'}
        </Button>
      </div>
    )
}

export default TextBox
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const TextBox = () => {
    const [text, setText] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    useEffect(() => {
        const synth = window.speechSynthesis

        const updateVoiceList = () => {
            setVoices(synth.getVoices())
        };

        synth.addEventListener('voiceschanged', updateVoiceList)
        updateVoiceList()

        return () => {
            synth.removeEventListener('voiceschanged', updateVoiceList)
        }
    }, [])

    const googleEnglishUKFemaleVoice = voices.find(
        (voice) => voice.name === 'Google UK English Female'
    )
    const googleEnglishUKMaleVoice = voices.find(
        (voice) => voice.name === 'Google UK English Male'
    )

    const availableVoices = [googleEnglishUKFemaleVoice, googleEnglishUKMaleVoice].filter(
        (voice) => voice !== undefined
    ) as SpeechSynthesisVoice[];

    const speakText = () => {
        if (speaking) {
            return
        }

        const synth = window.speechSynthesis
        const utterance = new SpeechSynthesisUtterance(text)
        
        if (selectedVoice) {
            utterance.voice = selectedVoice
        }

        setSpeaking(true);
        utterance.onend = () => {
            setSpeaking(false)
        }
        synth.speak(utterance)
    }

    /////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
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
        </div>
    );
};

export default TextBox;
