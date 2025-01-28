import { GiQuillInk } from "react-icons/gi";

interface LogoProps {
  fontSize: string;
  iconSize: number;
}

export default function Logo({ fontSize, iconSize }: LogoProps) {
  return (
    <span className="logo">
      <GiQuillInk size={iconSize} className="quill" />
      <h1 style={{ fontSize }}>Poefree</h1>
    </span>
  );
}
