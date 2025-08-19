import * as Icons from "@mui/icons-material";
import { IconProps } from "@mui/material/Icon";

interface MuiIconProps extends IconProps {
  name: string;
}

export const MuiIcon = ({ name, ...props }: MuiIconProps) => {
  const Icon = (Icons as Record<string, React.ElementType>)[name];
  if (!Icon) return null;
  return <Icon {...props} />;
};
