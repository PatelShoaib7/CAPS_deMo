import React, { useEffect } from 'react'
import { getData } from '../API/Api'
import img1  from '../Assets/img1.jpg'
import img2  from '../Assets/img2.jpg'
import img3  from '../Assets/img3.jpg'
import img4  from '../Assets/img4.jpg'
import img5  from '../Assets/img5.jpg'
import img6  from '../Assets/img6.jpg'
import img7  from '../Assets/img7.jpg'
import axios from 'axios';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";
import { makeStyles , Container} from "@material-ui/core";
import { useContext } from 'react'
import { App_Context } from '../Context/Context_API'
const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  }
  }))
 const Data =[]
export const Carosel = () => {
   const {data}=useContext(App_Context);
    const classes = useStyles();
    const items = data.map((elem)=>
    {
            return(
                      <div>
                            {/* <img height="80" style={{ marginBottom: 10 }}
                                  src={elem?.picture.large } alt={elem.name}/>
                                  <div>
                                  <p  >{elem.name.first} {' '}{elem.name.last}</p>
                                  </div> */}
       <img
          src={elem?.picture.large}
          alt={elem.name}
          height="80"
          style={{ marginBottom: 10 , borderRadius:'48%'}}
        />
        
          <span
            style={{
              color: 'gold',
              fontWeight: 500,
            }}
          >
          Name : {elem.name.first} {' '}{elem.name.last}
          <br />
             <span style={{color:'white'}}>
             Country : {elem.location.country}
             </span>
          </span>
                           
                      </div>
              )      
      })
    const responsive = {
        0: {
          items: 2, },
        512 :{
          items: 3,
        },
        800: {
          items: 3,
        },
        1000:{
               items:4 ,
        }
      };
  return (
    <div  className={classes.carousel}>
          <AliceCarousel
             mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1000}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
    </div>
  )
}
