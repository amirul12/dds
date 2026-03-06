import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface BlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    video: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::strapi-plugin-yt-clips.strapi-plugin-yt-clips'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      ['Frame', 'Download', 'Globe', 'Sparkles', 'LayoutPanelLeft', 'Palette']
    >;
    text: Schema.Attribute.Text;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPrimary: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsQuickAction extends Struct.ComponentSchema {
  collectionName: 'components_elements_quick_actions';
  info: {
    description: '';
    displayName: 'Quick Action';
  };
  attributes: {
    color: Schema.Attribute.String;
    desc: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      ['users', 'bell', 'calendar', 'briefcase', 'book', 'phone']
    >;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSlide extends Struct.ComponentSchema {
  collectionName: 'components_elements_slides';
  info: {
    description: 'Individual slide for a hero slider';
    displayName: 'Slide';
  };
  attributes: {
    cta: Schema.Attribute.String;
    desc: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_stats';
  info: {
    description: '';
    displayName: 'Stat';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface LayoutCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_layout_card_grids';
  info: {
    description: '';
    displayName: 'Card Grid';
  };
  attributes: {
    cardItems: Schema.Attribute.Component<'elements.card', true>;
  };
}

export interface LayoutContentWithImage extends Struct.ComponentSchema {
  collectionName: 'components_layout_content_with_images';
  info: {
    displayName: 'Content With Image';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    reverse: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    subHeading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    socialLinks: Schema.Attribute.Component<'elements.link', true>;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    buttonLink: Schema.Attribute.Component<'elements.link', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    topLink: Schema.Attribute.Component<'elements.link', false>;
  };
}

export interface LayoutHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sliders';
  info: {
    description: 'A carousel of slides for the hero section';
    displayName: 'Hero Slider';
  };
  attributes: {
    slides: Schema.Attribute.Component<'elements.slide', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutObjectives extends Struct.ComponentSchema {
  collectionName: 'components_layout_objectives';
  info: {
    description: 'Simple markdown objectives section';
    displayName: 'Objectives';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u09B8\u09AE\u09BF\u09A4\u09BF\u09B0 \u09B2\u0995\u09CD\u09B7\u09CD\u09AF \u0993 \u0989\u09A6\u09CD\u09A6\u09C7\u09B6\u09CD\u09AF'>;
  };
}

export interface LayoutQuickActions extends Struct.ComponentSchema {
  collectionName: 'components_layout_quick_actions';
  info: {
    description: 'Grid of quick action buttons';
    displayName: 'Quick Actions';
  };
  attributes: {
    actions: Schema.Attribute.Component<'elements.quick-action', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u09A6\u09CD\u09B0\u09C1\u09A4 \u09B8\u0982\u09AF\u09CB\u0997'>;
  };
}

export interface LayoutSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_layout_section_headings';
  info: {
    displayName: 'Section Heading';
  };
  attributes: {
    heading: Schema.Attribute.Text;
    subHeading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutSpotlight extends Struct.ComponentSchema {
  collectionName: 'components_layout_spotlights';
  info: {
    description: 'Featured section with image and glassmorphism effect for highlighting special activities';
    displayName: 'Spotlight';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    reverse: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    subHeading: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['primary', 'secondary', 'dark']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface LayoutStats extends Struct.ComponentSchema {
  collectionName: 'components_layout_stats_sections';
  info: {
    description: 'Grid of statistics';
    displayName: 'Stats Section';
  };
  attributes: {
    stats: Schema.Attribute.Component<'elements.stat', true>;
  };
}

export interface LayoutTopNav extends Struct.ComponentSchema {
  collectionName: 'components_layout_top_navs';
  info: {
    description: '';
    displayName: 'Top Nav';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    logoText: Schema.Attribute.String;
    navItems: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.text': BlocksText;
      'blocks.video': BlocksVideo;
      'elements.card': ElementsCard;
      'elements.link': ElementsLink;
      'elements.quick-action': ElementsQuickAction;
      'elements.slide': ElementsSlide;
      'elements.stat': ElementsStat;
      'layout.card-grid': LayoutCardGrid;
      'layout.content-with-image': LayoutContentWithImage;
      'layout.footer': LayoutFooter;
      'layout.hero': LayoutHero;
      'layout.hero-slider': LayoutHeroSlider;
      'layout.objectives': LayoutObjectives;
      'layout.quick-actions': LayoutQuickActions;
      'layout.section-heading': LayoutSectionHeading;
      'layout.spotlight': LayoutSpotlight;
      'layout.stats': LayoutStats;
      'layout.top-nav': LayoutTopNav;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
