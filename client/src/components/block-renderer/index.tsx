import type { Block } from "@/types";

import { Hero } from "@/components/block-renderer/layout/hero";
import { SectionHeading } from "@/components/block-renderer/layout/section-heading";
import { ContentWithImage } from "@/components/block-renderer/layout/content-with-image";
import { CardCarousel } from "@/components/block-renderer/layout/card-carousel";

import { Video } from "@/components/block-renderer/blocks/video";
import { Text } from "@/components/block-renderer/blocks/text";

import { HeroSlider } from "@/components/sections/HeroSlider";
import { Stats } from "@/components/sections/Stats";
import { QuickActions } from "@/components/sections/QuickActions";
import { Spotlight } from "@/components/block-renderer/layout/spotlight";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} {...block} />;
    case "layout.card-grid":
      return <CardCarousel key={index} {...block} />;
    case "layout.section-heading":
      return <SectionHeading key={index} {...block} />;
    case "layout.content-with-image":
      return <ContentWithImage key={index} {...block} />;

    case "blocks.video":
      return <Video key={index} {...block} />;
    case "blocks.text":
      return <Text key={index} {...block} />;
    case "layout.hero-slider":
      return <HeroSlider key={index} {...block} />;
    case "layout.stats":
      return <Stats key={index} {...block} />;
    case "layout.quick-actions":
      return <QuickActions key={index} {...block} />;
    case "layout.spotlight":
      return <Spotlight key={index} {...block} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
