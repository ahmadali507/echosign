/* eslint-disable @typescript-eslint/no-explicit-any */
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
