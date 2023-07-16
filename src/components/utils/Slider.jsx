"use client";

import { twMerge } from 'tailwind-merge';
import * as Slider from '@radix-ui/react-slider';

const SliderVol = ({onChange, className, formClass}) => (
  <form className={formClass}>
    <Slider.Root inverted="true" orientation='vertical' onValueChange={onChange} className={twMerge("relative flex flex-col items-center", className)} defaultValue={[100]} max={100} step={1}>
      <Slider.Track  className="bg-zinc-700 relative flex-grow rounded-full w-[3px]">
        <Slider.Range className="absolute bg-white rounded-full w-[3px]" />
      </Slider.Track>
      <Slider.Thumb className="block w-[20px] h-[20px] bg-white rounded-full" aria-label="Volume" />
    </Slider.Root>
  </form>
);

export default SliderVol;
