import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  paddingTop: "10px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/gidella_logo.png" alt="logo" height={45} width={154} priority unoptimized />
    </LinkStyled>
  );
};

export default Logo;
  