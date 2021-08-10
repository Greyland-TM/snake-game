export default function Sanke(props) {
  return (
    <div className="">
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return (
          <div className="snakedot" key={i} style={style}></div>
        )
      })}
    </div>
  )
}