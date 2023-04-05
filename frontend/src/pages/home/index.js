import React from "react";
import background_img from "../../assets/Home_Background.jpeg";
const styles = {
  header: {
    backgroundImage: `url(${background_img})`,
    height: "75vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    fontSize: "2.5em",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
  },
};
const Home = () => {
  const homeText =
    "Cyano WEB is a web infrastructure to help store and analyze water data related to CyanoHABs virtually.";
  return (
    <div
      style={{
        backgorundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <div style={styles.header}>
        <div style={styles.content}>
          <div className="grid">
            <div className="col-6 " style={{display:"flex",alignItems:"center",justifyContent:"center",height:"75vh"}}>
              {homeText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
