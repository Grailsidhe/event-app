export type Event = {
  title: string;
  image: string;
  day: string;
  links: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    deezer?: string;
    spotify?: string;
    soundcloud?: string;
    youtubeChannel?: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  copyright?: string;
  description?: string;
  origin?: string;
  genres: string[];
  events: object[];
  link: string;
  place: string;
  hour: string;
  sceneId: string;
  showStartDate: Date;
  guests: {};
};
