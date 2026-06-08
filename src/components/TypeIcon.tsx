import Box from "@mui/material/Box";
import PeopleIcon from "@mui/icons-material/People";
import BiotechIcon from "@mui/icons-material/Biotech";
import IconUsg from "../assets/usg.png";
import type { Typ } from "../types/mission";

const BRAND_BLUE = "#005aa9";

type TypeMeta = {
  color: string;
  bg: string;
  Icon?: typeof PeopleIcon;
  imageSrc?: string;
  iconSize?: number;
  imageScale?: number;
};

const BADANIE_GREEN = "#01847d";

export const TYPE_META: Record<string, TypeMeta> = {
  Badanie: { color: BADANIE_GREEN, bg: "#E6F5F3", imageSrc: IconUsg, iconSize: 32, imageScale: 1.55 },
  Konsultacja: { color: BRAND_BLUE, bg: "#E1E8F8", Icon: PeopleIcon, iconSize: 24 },
  "Badania laboratoryjne": { color: "#5B2D90", bg: "#EFE6FA", Icon: BiotechIcon, iconSize: 28 },
  USG: { color: BADANIE_GREEN, bg: "#E6F5F3", imageSrc: IconUsg, iconSize: 32, imageScale: 1.55 },
};

interface TypeIconProps {
  typ: Typ | string;
  size?: number;
  imageScale?: number;
}

export const TypeIcon = ({ typ, size, imageScale }: TypeIconProps) => {
  const meta = TYPE_META[typ] || TYPE_META.Konsultacja;
  const resolvedSize = size ?? meta.iconSize ?? 24;

  if (meta.imageSrc) {
    const scale = imageScale ?? meta.imageScale ?? 1;
    const dimension = resolvedSize * scale;
    return (
      <Box
        sx={{
          width: resolvedSize,
          height: resolvedSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "visible",
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: dimension,
            height: dimension,
            bgcolor: meta.color,
            maskImage: `url(${meta.imageSrc})`,
            WebkitMaskImage: `url(${meta.imageSrc})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </Box>
    );
  }

  const Icon = meta.Icon ?? PeopleIcon;
  return <Icon sx={{ fontSize: Math.round(resolvedSize * 0.75), color: meta.color }} />;
};
