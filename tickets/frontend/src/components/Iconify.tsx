import { Icon, IconifyIcon } from "@iconify/react";
import { Box, SxProps, Theme } from "@mui/material";
import { FC, forwardRef } from "react";

type IconifyProps = {
  sx?: SxProps<Theme>;
  width?: number | string;
  icon: string | IconifyIcon;
};

export const Iconify: FC<IconifyProps> = forwardRef(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);
