import {useState ,useEffect} from "react"

const DebateInformation = ({debateType,debateForm,handleInputChange}) => {


    const [ debateInfo,setDebateInfo] =useState(null)
    useEffect(() => {
      
    
              const deb =   DebateTypeArr.find(deb=>deb.type===debateType)
              setDebateInfo(deb)
     
    }, [debateType  ])
    
    // const DebateTypeInputsMapping={
    //     british_parliamentry:<ParliamentaryInputs debateForm={debateForm} handleInputChange={handleInputChange}/>
    // }


 
  return (
    <>
    {
     debateInfo  ?      
        <div  className={"debateInformationBox"}>
        
        <b>You choosed {debateInfo.type} type</b>
        <p className="debateInformation_box_desc">{debateInfo.desc}</p>
    
        </div> :""
    }
  
    </>
        )
}

export default DebateInformation;


const ParliamentaryInputs=({debateForm,handleInputChange})=>{
    return (


        <div className="additional_inputs">
             <div className='input_item'>
            <label className="form_label">No of rounds</label>
            <input name='noOfRounds' value={debateForm.noOfRounds} max={10} type="number" placeholder='Number of rounds' onChange={handleInputChange} />
          </div> 
          <div className={"input_item"}>
          <label className="form_label">Speak time : min</label>
            <input name='speakTime' type="number" placeholder='speak time' onChange={handleInputChange} />
          </div>
        </div>


    )
}
const LincolnInputs=({debateForm,handleInputChange})=>{
    return (


        <div className="additional_inputs">
             {/* <div className='input_item'>
            <label className="form_label">No of rounds</label>
            <input name='noOfRounds' value={debateForm.noOfRounds} max={10} type="number" placeholder='Number of rounds' onChange={handleInputChange} />
          </div>  */}
          <div className="input_item">
          <label className="form_label">Speak time</label>
            <input  name='speakTime' type="number" placeholder='speak time' onChange={handleInputChange} />
          </div>
        </div>


    )
}


const DebateTypeArr = [
    {   
        type:"Lincoln–Douglas",
        desc:"This debate  is a  of one-on-one competitive debate . Theres a two side & 1 person per side (1 Affirmative / 1 Negative) . Both side will get the limited time to speak . ",
        timeFormat:[
            {
                Aff:6,
                Both:3,
                Neg:6,
                Both:3,
                Aff:4,
                Neg:6,
                Aff:3
            }
        ]
    },{
        type:"British Parliamentary",
        desc:"This debate is for arguing in favour or against the motion  . There are two teams one team is of Government  and another is opposition of government. Each team can have 2/4 member . Both the team will get a limited time (you can choose the time)  to speak   for 2 rounds . ",
    }
]