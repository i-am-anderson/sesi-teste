import iconNatureza from "../assets/icons/icon-ciencias-natureza-20px.svg";
import iconMatematica from "../assets/icons/icon-matematica-20px.svg";
import iconLinguagens from "../assets/icons/icon-linguagens-20px.svg";

export const categories = {
  natureza: {
    label: "Ciências da natureza",
    icon: iconNatureza,
    color: "#E2D3F8",
  },
  matematica: { label: "Matemática", icon: iconMatematica, color: "#FCD19C" },
  linguagens: { label: "Linguagens", icon: iconLinguagens, color: "#CFE3FA" },
};

export const categoryById: Record<number, keyof typeof categories> = {
  1: "natureza",
  2: "matematica",
  3: "linguagens",
};
