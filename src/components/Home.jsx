import UserMap from "./UserMap";
import NextPile from "./NextPile";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import PileSummary from "./PileSummary";
// import { playColor, playDistance } from "../js/audio";

const Home = () => {
  // const nextPiles = useStoreState(state => state.nextPiles)
  
  // useEffect(()=>{
  //   if(nextPiles[0].distance) {
  //     let minDistance = Math.min(nextPiles[0].distance, nextPiles[1].distance)
  //     playDistance(minDistance)
  //   }
  // },[nextPiles])

  return (
    <div className="container is-fullwidth">
      <div className="columns p-0 m-0">
        <NextPile index={0} />
        <div className="column is-three-fifths p-0 m-0">
          <UserMap />
        </div>
        <NextPile index={1} />
      </div>
      <PileSummary /> 
    </div>
  );
};

export default Home;