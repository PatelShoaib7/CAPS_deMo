
export const userData =()=>`https://randomuser.me/api/?page=1&results=50`
export const get_Capsul_Data =(page, status)=> `https://api.spacexdata.com/v3/capsules?page=${page}&limit=20`
export const singal_caps_DAta =(capsule_serial)=>  `https://api.spacexdata.com/v3/capsules/${capsule_serial}`