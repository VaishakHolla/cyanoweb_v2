import React,{useEffect} from "react";
import background_img from "../../assets/Home_Background.jpeg";
import http from "../../utils/http-common"

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
    
    // useEffect(() => {
    //     console.log(process.env.REACT_APP_API_BASE_URL)
    //     console.log("useeffect")
    //     http.get("/")
    //      .then((response) => console.log(response));
    //    }, []);
    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_BASE_URL}`)
        fetch("http://127.0.0.1:6868/api")
          .then(response =>{ console.log(response);return response.json()})
        //   .then(data => setData(data))
          .catch(error => console.log(error));
      }, []);
    console.log("HOME")
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
