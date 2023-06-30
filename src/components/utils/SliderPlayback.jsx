"use client";

import { twMerge } from 'tailwind-merge';
import * as Slider from '@radix-ui/react-slider';

const SliderPlayback = ({onChange, className, onSecond}) => (
  <form className='w-full'>
    <Slider.Root onValueChange={onChange} disabled="true"  className={twMerge("relative flex items-center z-20", className) } defaultValue={[100]} value={[onSecond]} max={100} step={1}>
      <Slider.Track  className="bg-white/40 relative flex-grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-white rounded-full h-[3px]" />
      </Slider.Track>
      <Slider.Thumb className="block w-[10px] h-[10px] bg-white rounded-full" aria-label="Playback" />
    </Slider.Root>
  </form>
);

export default SliderPlayback;
