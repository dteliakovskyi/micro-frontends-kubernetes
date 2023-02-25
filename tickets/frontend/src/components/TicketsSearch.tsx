import { InputAdornment, OutlinedInput, Toolbar } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { Iconify } from "./Iconify";

type TicketsSearchProps = {
  filterName: string;
  onFilterName: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TicketsSearch: FC<TicketsSearchProps> = ({
  filterName,
  onFilterName,
}) => {
  return (
    <Toolbar sx={{ p: 2 }}>
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder="Search ticket..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </Toolbar>
  );
};
