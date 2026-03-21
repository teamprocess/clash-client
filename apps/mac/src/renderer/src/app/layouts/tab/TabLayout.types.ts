export interface Tab {
  name: string;
  url: string;
  onSelect?: () => boolean | void;
}
