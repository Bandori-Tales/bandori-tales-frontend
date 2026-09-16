export interface FormClassnamesProps {
  wrapper?: string;
  trigger?: string;
  content?: string;
  label?: string;
}

export interface CustomImageOverlay {
  useImageArray?: boolean;
  grayscale?: boolean;
  imageArrayIndex?: number;
  useOverlay?: boolean;
  overlayImageSource?: string;
  overlayImageClassname?: string;
}
