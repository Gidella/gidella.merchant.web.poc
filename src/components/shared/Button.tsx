import React from "react";
import { Box,Typography, FormGroup,FormControlLabel, Button, Stack, Checkbox } from "@mui/material";
import Link from "next/link";
import { IconLoader2 } from "@tabler/icons-react";

interface buttonModel {
  title: string;
  isLoading: boolean
}

const ButtonMode = ({ title, isLoading }: buttonModel) => (
  <>
    {
        isLoading ? 
        <Button color="primary" variant="contained" size="large" fullWidth component={Link} type="submit">
            <IconLoader2 className="text-[#030309] animate-spin h-auto w-5 shrink-0 stroke-[1.5]" />
        </Button> : 
        <Button color="primary" variant="contained" size="large" fullWidth component={Link} type="submit">
            {title}
        </Button>
    }
  </>
);

export default ButtonMode;
