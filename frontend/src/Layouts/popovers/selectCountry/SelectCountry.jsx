import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
Button,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,

} from '@chakra-ui/react';

const SelectCountry = ({children,countries,handleInputChange}) => {
      const { onOpen, onClose, isOpen } = useDisclosure()
  return (
<Popover 
       isOpen={isOpen}
      
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={false}
        placement='top'
 >
  <PopoverTrigger>
<span style={{height:"100%"  ,width:"100%"}}>{children}</span>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverBody height={"300px"} overflowY={"scroll"} display={"flex"} flexDirection={"column"} gap={"5px"}>

    {countries.map(country=>(

        <div onClick={()=>{handleInputChange(prev=>({...prev,country:country?.name?.common}));onClose()}}  className='country_item' style={{display:"flex",alignItems:"center",gap:"10px"}} key={country?.name?.common}>
        <img className='country_flag' width={"44px"} src={country?.flags?.png}  />
            <p className='country_name'>{country?.name?.common}</p>
        </div>

    ))}


    </PopoverBody>
  </PopoverContent>
</Popover>
  )
}

export default SelectCountry