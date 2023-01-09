import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { App_Context } from '../Context/Context_API'
import axios from 'axios';
import { PhoneIcon, SearchIcon} from '@chakra-ui/icons'
import { get_Capsul_Data, singal_caps_DAta } from '../API/Api'
import {Fade ,Backdrop ,Modal, Container , TextField  ,LinearProgress ,Paper ,TableRow ,TableHead , TableContainer , TableCell , TableBody , Table, makeStyles, Typography , ThemeProvider, createTheme} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Flex, Spacer , Box , Select, Input, Button ,Avatar , Text , Link, Heading, color, textDecoration, InputLeftElement, InputGroup } from '@chakra-ui/react'
import img6  from '../Assets/img6.jpg'

//ALL STYLEINGS ARE MADE FROM HERE
const useStyles = makeStyles((theme)=>
({
    root: {
      backgroundColor: "#16171a", cursor: "pointer", fontSize:'18px', height:'60px', fontFamily: "Montserrat",
      "&:hover": { backgroundColor: "#131111", fontSize:'40px' },
      tab:{ fontSize:'40px'  },
      "&:hover": {
          backgroundColor: "rgb(96,97,99)", fontSize:'20px', color:'gold',
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }  
    },
    TopText:{ margin: '0px 18px 18px 18px', paddingTop:'20px', fontFamily: "Montserrat" , color:'whitesmoke'},
     FLEX :{border:"2px solid white"  , alignItems: 'center', color:'rgb(238,188,29)' ,fontSize:'20px' , borderRadius:'8px', margin:'0 0 15px 0'} ,
     pagination: {
      display:'flex', justifyContent:'center', alignItems:'center',
      "& .MuiPaginationItem-root": {
        color: "gold", border:'1px solid lightgrey', height:'2.5rem', width:'2.5rem', fontSize:'25px',  marginBottom:'40px'  },
    },
    Container: {maxHeight: 500, width: '100%',fontSize:'18px',color:'gold', },

    BTN:{ margin:'20px'},
    modal: { display: "flex", alignItems: "center", justifyContent: "center"  },

      paper: {
        backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),  backgroundColor:'white', border:'2px solid teal', width:'650px', heigth:'350px', borderRadius:'12px'
      }
  }))
const CHAKRA_COMP ={
  Serach_INPT :{ marginBottom: 20, width: "100%" , border:'2px solid white' , borderRadius:'7px' , color:'black' , background:"white", height:"60px", fontSize:'20px'},
  Select_Box:{border:'2px solid  white', fontSize:'18px'},
  Table_ROW:{color: "black", fontWeight: "700", fontFamily: "Montserrat"}
}


  
export const Body = () => {
    const classes = useStyles();
    const [capDATA , setCapDAta]= useState([]);
    const[sortBy , setSortBy]=useState('');
    const [filterBy , setFilterBy]=useState('NULL');
    const [open, setOpen] = React.useState(false);
    const [singalDATA , setSinData]=useState([])
    const [search , setSearch]=useState('')
    const { page  , setPage, setLimit   , status , setStatus , order , setOrder}=useContext(App_Context)


 //FOR OPENI AND CLOSING OF MODEL
    const handleOpen = () => {
        setOpen(true);
      };
//FOR FETCHING THE COMING DATA
 const fetchBodyData =async()=>{
              const {data} = await axios.get(get_Capsul_Data(page , status  ))
              const updtedDATA = data.map((elem,i)=> {
                  return {
                      ...elem ,
                      id:i+1 ,
                      filterStatus:false
                  }
              })
              setCapDAta(updtedDATA)
      }
//FOR SORTING THE ORDER 
   const sortyBy_FUN ={
        ASC_Ord:((a,b)=>(Number(a.id) - Number(b.id))),
        DSC_Ord:((a,b)=> (Number(b.id) - Number(a.id)))
    }
//FOR DIFFRENT FILTERS
   const FiterBy_FUNC ={
        NULL:((elem)=> elem),
       ACTIVE :((elem )=> elem.status == "active" ),
       RETIRED :((elem )=> elem.status == "retired"  ),
       UNKNOWN :((elem )=> elem.status == "unknown"  ),
   }
//FOR SINGAL SELTED CAPSULES DATA 
  const showDetails =async (e)=>{
       const capsule_serial = e.target.value;
       const {data} = await  axios.get(singal_caps_DAta(capsule_serial))
       setSinData(data);
       //console.log(data)
      handleOpen();
  }
//FOR MOUNTING UPDATING UNMOUNTING 
 useEffect(()=>{
        fetchBodyData()
    },[page , sortBy , filterBy , search])

//FOR SERACHING THE CAPSULES BY STATUS ID SERIES
   const searchCapsul =()=>{
        return  capDATA.filter((elem)=> 
            elem.capsule_id.toLowerCase().includes(search) ||
            elem.capsule_serial.toLowerCase().includes(search) ||
            elem.status.toLowerCase().includes(search)  
       )
 }     


return (
<div style={{backgroundColor:'rgb(23,25,35)'}}>
    <Container style={{ textAlign: "center"}} > 
      <Typography variant="h4" className={classes.TopText}> Get All The Available Missile Below Here... </Typography>
            <InputGroup>
                        <InputLeftElement   pointerEvents='none'
                              children={<SearchIcon color='black' display={'flex'} mt="6" ml="4" />}>
                          </InputLeftElement>                                                
                           <Input    onChange={(e) => setSearch(e.target.value)} 
                                     leftIcon={<SearchIcon />} style={CHAKRA_COMP.Serach_INPT}
                                      placeholder="Search For Required Missle By Name / ID  /Current Status ">
                          </Input>
             </InputGroup>
             <Flex className={classes.FLEX}>   
                <Box p='4' >
                        <Select  onChange={(e)=> setFilterBy(e.target.value)} style={CHAKRA_COMP.Select_Box}> 
                               <option value="NULL">ALL Status Caps</option>
                                <option value="ACTIVE" >Only Active </option>
                                <option value="RETIRED">Only Retired </option>
                                <option value="UNKNOWN">Only Unknown</option>
                        </Select>
                 </Box>
                  <Box  p={2}>
                            <label>Ascending </label>
                             <input   onChange={(e)=> setSortBy(e.target.value)}
                                            name="sortBy" value="ASC_Ord" type="radio" />
                            <label >Decending </label>
                               <input   onChange={(e)=> setSortBy(e.target.value)}
                                        name="sortBy" value="DSC_Ord" type="radio" />
                </Box>
            </Flex>
<Paper >
       <TableContainer   >
        {/* //TO APPLY BG COLOR TO SHOW BELOW TABLE */}
            <Table    >
                  <TableHead style={{ backgroundColor: "#EEBC1D" }}  >
                      <TableRow  >
                              { ["AVTAR", "CAPS NAME ",'CAPS ID ' ," CAPS SERIES" , "LANDINGS" , "CURRENT STATUS" , "CAP VERSION" ,"LAUNCH DATE" ].map((Column_Label) => ( 
                                <TableCell key={Column_Label} style={CHAKRA_COMP.Table_ROW}>
                                          {Column_Label}
                                </TableCell>
                              ))}
                      </TableRow>
              </TableHead>
{/* IF DATA IS PRESNET THE FETCH INSIDE THE TABLE ROWS  ELSE DO NOT MAP DATA INSIDE THE ROWS*/}
      <TableBody>
        {   searchCapsul().slice((page-1)*6,(page-1)*6 + 6).sort(sortyBy_FUN[sortBy]).filter(FiterBy_FUNC[filterBy])
            .map((elem , index)=>(   
                <TableRow className={classes.root} >
                        {/* CAPS AVTAR IMAGE */}
                          <TableCell > 
                              <Avatar src='https://images.pexels.com/photos/355931/pexels-photo-355931.jpeg?auto=compress&cs=tinysrgb&w=300' style={{borderRadius:'48px' , width:'40px'}} />
                          </TableCell>
                        {/* NAME */}
                          <TableCell  style={{color:'gold'}}> 
                                      {elem.capsule_serial}
                           </TableCell >
                           <TableCell  style={{color:'gold'}} > 
                                      {elem.type}
                           </TableCell>
                          <TableCell style={{color:'gold'}} > 
                                     {elem.capsule_id}
                         </TableCell >
                        {/* TOTAL LANDINGS */}
                           <TableCell  style={ elem.missions[0]? {color:'gold'} : {color:'red', fontSize:'18px'}} > 
                                      {elem.missions[0]? elem.missions[0].flight : 'Not A/v'}
                           </TableCell>
                        {/* CURREENT STATUS */}
                           <TableCell  style={elem.status == "retired" ? {color:'red', fontSize:'18px'} : elem.status == "active" ? {color:'green' ,  fontSize:'18px'} : {color: 'rgb(0,120,255)' , fontSize:'18px'}} > 
                                      {elem.status}
                           </TableCell>
                             {/* CAPS ID */}
                             <TableCell   style={elem.missions[0] ? {color:'gold'} : {color:'red', fontSize:'18px'}}> 
                                          {elem.missions[0] ? elem.missions[0].name : "Not Available" }
                           </TableCell>
                        {/* CAPS SERIES */}
                           <TableCell  style={{color:'gold'}}>
                              <div>{elem.original_launch}
                                    <Button  ml='5' value={elem.capsule_serial } colorScheme={'whatsapp'} type="button" onClick={(e)=> showDetails(e)}>
                                          More Details 
                                    </Button>
                              </div>     
                           </TableCell>   
                </TableRow>
            ))  
         }
         </TableBody>
        </Table>
      </TableContainer>
    </Paper> 
    <div  className={classes.pagination}>
        <Pagination  count={Math.round(Number((capDATA?.length/6).toFixed(1)))}
                          onChange={(elem , value)=>{ setPage(value); }}
                          variant="outlined" color="secondary" >
        </Pagination>
      </div>
 <Modal
       className={classes.modal} open={open}  BackdropComponent={Backdrop}fontSize="18px" bg="white" >
          <Fade in={open}> 
                   <div className={classes.paper}   style={  singalDATA.status=="active" ? {border:'12px solid green'} : singalDATA.status=="unknown" ? {border:'12px solid blue'} : {border:'12px solid red'} }>
                        <Box p={4} display={{ sm: 'flex' }}  >
                              <Box flexShrink={0} pr={8} mr={8} borderRight={'2px solid  lightgrey'}>
                                  <Avatar  borderRadius='lg' width={{ sm: 60 }} p={2}  height="100%"
                                    style={singalDATA.status=="active" ? {border:'5px solid green'} :singalDATA.status=="unknown"? {border:'5px solid blue'}:  {border:'5px solid red'}}/>
                              </Box>
                        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                              <Text fontWeight='bold'  textTransform='uppercase' fontSize='sm'  letterSpacing='wide'color='teal.600'>
                                    <Heading>capsule_id {singalDATA.capsule_id} </Heading>
                              </Text>
                              <Text   mt={1}  display='block' fontSize='25px' lineHeight='normal' fontWeight='semibold' >details of { singalDATA.capsule_serial}</Text>
                              <Text mt={2} color='gray.500'>
                                            <h2>{singalDATA.details}</h2>
                                            <p >  capsule_serial : { singalDATA.capsule_serial} </p>
                                            <p>capsule_id : { singalDATA.capsule_id} </p>
                                            <p> original_launch:  { singalDATA. original_launch}</p>
                                            <p  style={singalDATA.status=="active" ? {color:'green', fontSize:'20px'} :  {color:'red', fontSize:'20px'}}>status : {singalDATA.status} </p>
                              </Text>
                              <Button colorScheme={'red'} onClick={()=> setOpen(false)}>Close</Button>
                        </Box>
                  </Box>
               </div>
           </Fade>
    </Modal>
</Container>
    </div>
  )
}
