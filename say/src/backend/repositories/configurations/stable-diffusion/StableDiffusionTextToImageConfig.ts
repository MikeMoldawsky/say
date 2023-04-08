import { BotConfigInternal } from "../IBotConfigurationRepository";

export interface StableDiffusionTextToImageBotConfig extends BotConfigInternal {
  type: 'STABLE_DIFFUSION_TEXT_TO_IMAGE';
  configuration: StableDiffusionTextToImageConfig;
}

export interface StableDiffusionTextToImageConfig {
  prompts: {
    text: string;
    weight?: number;
  }[];
  samples?: number;
  steps?: number;
  cfgScale?: number;
  sampler?: keyof {
    SAMPLER_DDIM: 0;
    SAMPLER_DDPM: 1;
    SAMPLER_K_EULER: 2;
    SAMPLER_K_EULER_ANCESTRAL: 3;
    SAMPLER_K_HEUN: 4;
    SAMPLER_K_DPM_2: 5;
    SAMPLER_K_DPM_2_ANCESTRAL: 6;
    SAMPLER_K_LMS: 7;
    SAMPLER_K_DPMPP_2S_ANCESTRAL: 8;
    SAMPLER_K_DPMPP_2M: 9;
    SAMPLER_K_DPMPP_SDE: 10;
  };
  clipGuidancePreset?: keyof {
    GUIDANCE_PRESET_NONE: 0;
    GUIDANCE_PRESET_SIMPLE: 1;
    GUIDANCE_PRESET_FAST_BLUE: 2;
    GUIDANCE_PRESET_FAST_GREEN: 3;
    GUIDANCE_PRESET_SLOW: 4;
    GUIDANCE_PRESET_SLOWER: 5;
    GUIDANCE_PRESET_SLOWEST: 6;
  };
  seed?: number;
  height?: number;
  width?: number;
}
