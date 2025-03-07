import { ImReddit } from "react-icons/im";
import { Button } from "@/components/ui/button"

interface ButtonIconProps {
  onClick: () => void;
}

export function ButtonIconUnFav({ onClick }: ButtonIconProps) {
  return (
    <Button variant="outline" size="icon" onClick={onClick} className='hover:scale-105 transition-transform'>
      <ImReddit />
    </Button>
  )
}
