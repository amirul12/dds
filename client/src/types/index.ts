
type Image = {
  id: string;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name: string;
}   

type ComponentType =
  | "layout.hero"
  | "layout.card-grid"
  | "layout.section-heading"
  | "layout.content-with-image"   
  | "layout.hero-slider"
  | "layout.quick-actions"
  | "layout.stats"
  | "blocks.video"
  | "blocks.text";

interface Base<T extends ComponentType, D extends {} = {}> {
  __component: T;
  id: string;
  createdAt: string;
  updatedAt: string;
  data: D;
}

export interface NavLink {
  href: string;
  text: string;
  isExternal: boolean;
  isPrimary: boolean;
}

export type Block = HeroProps | CardGridProps | SectionHeadingProps | ContentWithImageProps | VideoProps | TextProps | HeroSliderProps | QuickActionsProps | StatsProps;

export interface HeroProps extends Base<"layout.hero"> {
  heading: string;
  text: string;
  topLink?: NavLink;
  buttonLink?: NavLink[];
  image: {
    url: string;
    alternativeText: string | null;
    name: string;
  };
}

export interface CardGridProps extends Base<"layout.card-grid"> {
  cardItems: {
    id: string;
    heading: string;
    text: string;
    icon: string;
  }[];
}

export interface SectionHeadingProps extends Base<"layout.section-heading"> {
  heading: string;
  subHeading: string;
  text: string;
  centered?: boolean;
}

export interface ContentWithImageProps extends Base<"layout.content-with-image"> {
  reverse: boolean;
  image: {
    url: string;
    name: string;
  };
  heading: string;
  subHeading: string;
  text: string;
}


export interface VideoProps extends Base<"blocks.video"> {
  title: string;
  description: string;
  videoUrl: string;
  video: {
    videoId: string;
    start: string;
    end: string;
  },
  image: Image;
}

export interface TextProps extends Base<"blocks.text"> {
  content: string;
}

export interface HeroSliderProps extends Base<"layout.hero-slider"> {
  slides: {
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    cta: string;
    href: string;
    image: Image;
  }[];
}

export interface QuickActionsProps extends Base<"layout.quick-actions"> {
  title: string;
  actions: {
    id: string;
    title: string;
    desc: string;
    href: string;
    icon: string;
    color: string;
  }[];
}

export interface StatsProps extends Base<"layout.stats"> {
  stats: {
    id: string;
    label: string;
    value: string;
    icon: string;
  }[];
}
