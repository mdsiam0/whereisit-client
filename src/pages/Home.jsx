import React, { useEffect } from "react";
import Banner from "../components/Banner";
import HowItWorks from "../components/HowItWorks";
import CommunityTrust from "../components/CommunityTrust";
import LatestItems from "../components/latestItems";

const Home = () => {
  useEffect(() => {
    document.title = "WhereIsIt | Home";
  }, []);

  return (
    <div>
      <Banner></Banner>
      <LatestItems></LatestItems>
      <HowItWorks></HowItWorks>
      <CommunityTrust></CommunityTrust>
    </div>
  );
};

export default Home;
