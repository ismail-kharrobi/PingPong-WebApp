import { useEffect , useState} from "react"
import { Rect, Stage , Layer , Circle, Line} from "react-konva"
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from "react-icons/bs";
import { useUserStore } from "../../Stores/stores";
import { useGameState } from "./States/GameState";
import { useSocketStore } from "../Chat/Services/SocketsServices";
import { useNavigate } from "react-router-dom";

const DURATION = 20;
type Cords = {
  x:number;
  y:number;
  ballsize:number;
}
type  ball ={
  x:number,
  y:number,
};
const throttle = (function() {
  let timeout:any = undefined;
  return function throttle(callback:any) {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        timeout = undefined;
      }, DURATION);
    }
  }
})();


function throttlify(callback : any) {
  return function throttlified(event :any) {
    throttle(() => {
      callback(event);
    });
  }
}

export const Game = () => {
    const gameState = useGameState();
    const socketStore = useSocketStore();
    const user = useUserStore();    
    const navigate = useNavigate()
    const [first , setFirest] = useState(false)
    const handleMove = throttlify((e :any) => {

        const margin = (gameState.height / 6) / 2;
        if (e.evt.layerY  <= (gameState.height - margin) &&  e.evt.layerY >= margin)
        gameState.setLPaddle(e.evt.layerY - margin)
    })
    useEffect(() => {
        socketStore.socket.on("ball", (cord:Cords) => {
          gameState.setBall({x:cord.x,y:cord.y,size:cord.ballsize})
          console.log(gameState.ball)
        })
        socketStore.socket.on("screen Error", () =>{
          console.log("you lose")
          // navigate("/home");
        })
      
    },[])
    /* eslint-disable */
    useEffect(() => {
      const divh = document.getElementById('Game')?.offsetHeight
      const divw = document.getElementById('Game')?.offsetWidth
      socketStore.socket.emit("screen",{h:divh,w:divw})
        window.addEventListener('resize', () => {
            const divh = document.getElementById('Game')?.offsetHeight
            const divw = document.getElementById('Game')?.offsetWidth
            socketStore.socket.emit("screen",{h:divh,w:divw})
            // if (divh) gameState.setHeight(divh);
            // if (divw) gameState.setWidth(divw);
            // if (divh) gameState.setLPaddle(divh / 2)
        });
        if(gameState.p1Score === 0 && gameState.p2Score === 0) {
          
        }
       
        // disable
    },[])

    useEffect(() => {
        const divh = document.getElementById('Game')?.offsetHeight
        const divw = document.getElementById('Game')?.offsetWidth
        console.log(divh)
        console.log(divw)
        if (divh) gameState.setHeight(divh);
        if (divw) gameState.setWidth(divw);
        if (divh && divw){
     
        
      }
    },[gameState.width , gameState.height])
    console.log(gameState.lPaddle)
    return ( 
    <div className="flex flex-col gap-10 justify-start md:justify-center md:items-center items-center pt-12 md:pt-0  h-full w-full" >
        <div className="flex items-center justify-center gap-x10 w-full xl:pt-4">
            <div className="flex items-center justify-center w-1/4 gap-6">
                <img alt="" className="rounded-full w-auto h-auto max-w-[10vw] md:max-w-[20vw]" src={user.picture.medium} />
                <span className="font-lexend font-extrabold text-[4vw] xl:text-[2vw] text-current">1</span>
            </div>
            <div className="flex items-center justify-center w-1/4 gap-6">
                <span className="font-lexend font-extrabold text-[4vw] xl:text-[2vw] text-current">5</span>
                <img alt="" className="rounded-full w-auto h-auto max-w-[10vw] md:max-w-[20vw]" src={user.picture.medium} />
                
            </div>
            <button className="btn" onClick={() => socketStore.socket.emit("leave")}>Leave</button>

        </div>
        <div className="flex items-center justify-center min-h-16 max-h-[80%] max-w-[90%] min-w-16 w-[95%] rounded-xl aspect-video border-primary border-4" id="Game">
            <Stage onMouseMove={handleMove}  width={gameState.width - 12} height={gameState.height - 12}  >
                <Layer >
                    <Rect height={gameState.height} width={gameState.width} fill="#151B26" x={0} y={0} />
                    <Line points={[0, gameState.height , 0 , 0]} dash={[gameState.height / 30 , 10]} strokeWidth={2} stroke={"white"} height={gameState.height} width={20} fill="white" x={gameState.width / 2} y={0}  />
                    <Rect cornerRadius={12} height={gameState.height / 6} width={gameState.width / 70} x={10} y={gameState.lPaddle} fill="white" />
                    <Rect cornerRadius={12} height={gameState.height / 6} width={gameState.width / 70} x={gameState.width - 20 - (gameState.width / 70)} y={gameState.height  / 3} fill="white" />
                    <Circle fill="white" height={gameState.ball.size} width={gameState.ball.size} x={gameState.ball.x} y={gameState.ball.y} />
                </Layer>

            </Stage>
            
        </div>
        {gameState.mobile && (
        <div className="flex justify-around items-center w-full gap-20">
            <BsFillArrowLeftCircleFill className="w-14 h-14 hover:cursor-pointer hover:fill-secondary hover:transition-colors delay-100 "/>
            <BsFillArrowRightCircleFill  className="w-14 h-14 hover:cursor-pointer hover:fill-secondary hover:transition-colors delay-100"/>
        </div>
    )
        
        }
    </div>

    )
} 