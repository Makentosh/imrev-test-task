import Eye from './eye-svgrepo-com.svg?react';
import EyeClose from './eye-slash-svgrepo-com.svg?react';
import { SVGProps } from 'react';

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Eye { ...props }/>;
};

export const EyeCloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return <EyeClose { ...props }/>;
}
