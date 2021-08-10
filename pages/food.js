import Image from "next/image";
import cherry from "../public/cherry.png";

export default function Food(props) {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
    transform: 'scale(6)'
  };
  return (
    <div className="snakefood" style={style}>
      <Image
        
        src={cherry}
        height={60}
        width={80}
        alt="cherry-image"
      />
      
    </div>
  );
}
