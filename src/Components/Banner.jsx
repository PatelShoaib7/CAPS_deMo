import { Box, Button, Flex, Heading, Spacer ,ButtonGroup, Image, Text} from "@chakra-ui/react";
import {  Container, Link, makeStyles, Typography } from "@material-ui/core";
import { Carosel } from "./Carosel";
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg)",
  },
  bannerContent: {
    height: 450,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    // border:'4px solid red'
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    display: "flex",
    alignItems: "center",
  },
}));
 const NavData = ["Home", "About" , "Products" , "Careers" , "Know More" ]
export const Banner=()=> {
  const classes = useStyles();

  return (
  <div> 
    <Flex minWidth='max-content' alignItems='center' gap='2' borderBottom="1px solid lightgrey" h="65px" >
  <Box>
      <Image src="https://brainstormforce.com/wp-content/uploads/2021/02/logo-bsf.svg" alt="brainstrom img" h="60px"/>
  </Box>
  <Spacer />
  <ButtonGroup gap='2'>
    <Button colorScheme='whatsapp'>Sign Up</Button>
    <Button colorScheme='blue'>Log in</Button>
  </ButtonGroup>
</Flex>
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color:'white'
            }}
          >
           BrainStrom Forcs
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              color:'white'
            }}
          >
            Get all the Info regarding Capsules @by shoaib
          </Typography>
        </div>
        <div style={{color:'gold', display:'flex', flexDirection:'left' ,margin:'10px 0 0 0px', fontSize:'23px' , fontWeight:'bold'}}>
          <h2>Meet Our Customers </h2>
        </div>
      <Carosel />
      </Container>
    </div>
    </div>
  );
}