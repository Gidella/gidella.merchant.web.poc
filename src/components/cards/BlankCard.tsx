import { Card, CardProps } from "@mui/material";

interface Props extends CardProps {
  className?: string;
}

// Modify BlankCard to accept `sx` and other Card props
const BlankCard = ({ children, className, sx, ...rest }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative", ...sx }} // Merge default sx with passed sx
      className={className}
      elevation={9}
      {...rest} // Pass other props (like elevation, variant, etc.)
    >
      {children}
    </Card>
  );
};

export default BlankCard;
