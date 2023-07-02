import { Enums } from "../redux/action/actionTypes/Enumss"

export const AvatarsImg = [
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar2.png?alt=media&token=4300e22f-ddbb-4705-89f2-be07f874482e",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar3.png?alt=media&token=fa4b4566-e1ec-4992-a4f4-91f96d152994",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar4.png?alt=media&token=aac2026f-9732-4005-b9d8-343a55743b97",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar5.png?alt=media&token=d95afaa1-a672-40ec-afea-68de431bc3fa",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar6.png?alt=media&token=c28fb107-d80b-4611-9561-5042c41ee9f8",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar7.png?alt=media&token=419170d1-3610-4e72-a963-5ee3ef1ec27f",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar8.png?alt=media&token=5e7ed749-bba0-4b76-9986-6673ae8a14c0",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar9.png?alt=media&token=7630503c-9f93-4c1d-8425-b6127bab7dec",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar10.png?alt=media&token=ceb8a9b8-5c07-41fa-b951-969554cf200e",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar11.png?alt=media&token=d825b3ec-64cd-4c31-8369-1f540abcd841",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar12.png?alt=media&token=084eb506-e7d8-40fc-85cc-56fad2932246"
]
export const TimeFormatMappingMethod= (teamsNameArr,format)=>{

    
    let timeMaps =   new Map([
        ["Lincoln–Douglas",[
            { team : teamsNameArr[0], time :6 },
            { team:"both", time :3 },
            { team: teamsNameArr[1], time : 6 },
            { team: "both" , time: 3 },
            { team:  teamsNameArr[0], time : 4 },
            { team:  teamsNameArr[1], time: 6 },
            { team:  teamsNameArr[0], time:3 },
        ]],
        [
            "British Parliamentary",[
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
           
            ]
        ],
        [
            "Public forum",[
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
           
            ]
        ],
          [
            "WSDC",[
                { team : teamsNameArr[0], time :8 },
                { team: teamsNameArr[1], time : 8 },
                { team : teamsNameArr[0], time :8 },
                { team: teamsNameArr[1], time : 8 },
                { team : teamsNameArr[0], time :8 },
                { team: teamsNameArr[1], time : 8 },
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 }
           
            ]
        ],
            [
            "Cafe Debate",[
                { team : teamsNameArr[0], time :5 },
                { team: teamsNameArr[1], time : 5 },
                { team : teamsNameArr[0], time :5 },
                { team: teamsNameArr[1], time : 5 },
  
           
            ]
        ],
        [
            "Fun Debate",[
                {team:teamsNameArr[0],time:3},
                {team:teamsNameArr[1],time:2},
                {team:teamsNameArr[0],time:1},
            ]
        ]
    ])
    
    
    
    return timeMaps.get(format)
    
} 
export const judgeType=[
    "AI_JUDGE",
    "JUDGE",
    "NO JUDGE"
]
export const debateFormat=new Map([
    ["British Parliamentary",[2,4]],
    ["Public forum",[2]],
    ["Lincoln–Douglas",[1]],
    ["WSDC",[3]],
    ["Cafe Debate",[2]],
    ["Fun Debate",[2]],
])

export const coachData = [
    {
        name:"Olivia",
        image:"images/coach1.png",
        country:"United States",
        desc:"Oxford Graudate and DebAI coach,empowering minds with expertise.",
        calendlyLink:""
    },
    {
        name:"Rachel",
        image:"images/coach2.png",
        country:"United States",
        desc:"  Oxford Graudate and DebAI coach,guiding individuals towards their full potential.",
        calendlyLink:""
    },
    {
        name:"Tan Weinja",
        image:"images/coach3.png",
        country:"Singapore",
        desc:"  Oxford Graudate and DebAI coach, transforming lives through personalized guidance.",
        calendlyLink:""
    },
    
]


// export const adminForm= new Map([
//     [Enums.MOTION_FORM,[
//         "topic",
//         "name"
//     ]]
// ])
export const avatarsTypeData={
    common:[


        
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/53.jpg?alt=media&token=7cda4c2e-f7ab-4b4c-a6e0-807ad2366672",


        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/55.jpg?alt=media&token=9b99031f-22c5-4a9b-8460-70fe2a4c288f",

 
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/56.jpg?alt=media&token=034193e1-0eb2-41b4-85c1-74cf76cc1a6a",
   
       
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/57.jpg?alt=media&token=eb962743-239a-4f46-8045-541a905e10e1",
      
        
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/58.jpg?alt=media&token=0018fbba-d08f-466b-80e4-4bb5d670eb15",
   
        
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/59.jpg?alt=media&token=6d901e80-198c-4607-84d8-8daddf616645",
    
   
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/60.jpg?alt=media&token=02718dad-f36b-4bef-8cf5-53fb08a47416",
    
   
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/61.jpg?alt=media&token=e87f4f13-317a-425b-a667-fa0c472ebcc1",
   
   
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/62.jpg?alt=media&token=d961306f-4fc5-4bc7-a691-d307dd429007",

    
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/63.jpg?alt=media&token=f7b4d99c-e0b7-4210-9206-ac71145d291e",
     
      
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/64.jpg?alt=media&token=9aa1969e-b507-4ce3-b0d0-48c734dcad1a",
   
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/65.jpg?alt=media&token=da19f128-52e5-479a-9eec-889f2f095062",
       
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/66.jpg?alt=media&token=afe27df7-80b2-4508-b556-e3d4a1dcc001",
      
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/67.jpg?alt=media&token=f2ed242d-a3c4-4e6c-8248-d7d1e74975d6",
    
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/68.jpg?alt=media&token=bcda09dc-31f1-4125-b208-d9065efa30a5",
      
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/69.jpg?alt=media&token=f66894a7-ef9a-487c-b739-72b1cd3a9188",
    
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/70.jpg?alt=media&token=4208b6c9-f937-4202-895e-4860ed32e18a",
       
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/71.jpg?alt=media&token=6d72a56b-38d0-47e5-a45e-b98cdac41068",
     
        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/72.jpg?alt=media&token=a7e81c3d-3541-4e9f-a76e-155967fb3b30",

    ],
    epic:[

        "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/1.jpg?alt=media&token=bdf92c7f-6888-48cf-8276-c0d5817c6d7d", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/2.jpg?alt=media&token=1a66ea74-9a8e-4543-b70d-ee4ce4884911", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/3.jpg?alt=media&token=810c002e-514d-4278-9092-33758ed62e80", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/4.jpg?alt=media&token=54fbbe21-8264-4904-9f49-35cce0b41f91", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/5.jpg?alt=media&token=32fa2593-0d88-431f-a2a2-f74ac8b2b72c", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/6.jpg?alt=media&token=d1137789-1160-4e2e-b7c1-8102e0d91b53", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/7.jpg?alt=media&token=ab0bc231-d63b-4014-96f5-45c5688ffa96", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/8.jpg?alt=media&token=f820d1c5-d414-4114-acc6-8dd1011c2455", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/9.jpg?alt=media&token=0aa0cf0b-e6bf-4fdd-a8bf-674a4c276b06", 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/10.jpg?alt=media&token=e695e3eb-5490-4841-9d82-2fdd0765a6bf"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/11.jpg?alt=media&token=a691ecb1-2381-41c5-8383-ca94318c13a9"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/12.jpg?alt=media&token=3398a835-061e-4aaf-bcc3-c1d8a9ab7b08"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/13.jpg?alt=media&token=5b0886bd-d504-45e3-971d-8683a3645277"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/14.jpg?alt=media&token=1e3beaed-bc1a-45f3-96ab-53ef8dec4753"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/15.jpg?alt=media&token=3207ce87-4aa5-46fc-a2ca-de64ae760687"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/16.jpg?alt=media&token=27f46b10-1e7e-4a2f-9b10-973ab5523478"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/17.jpg?alt=media&token=9de0051d-bcdf-4d3e-bc06-27b7d57c87c8"
, 
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/18.jpg?alt=media&token=1260c4bc-5d6e-4eb3-9ad0-72c693a7f660"


    ],
    rare:[
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/37.jpg?alt=media&token=81edccf6-5aff-46a8-b986-6e93e6a3ec00",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/38.jpg?alt=media&token=09fc5c63-0475-4743-80d4-2afe884f60e9",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/39.jpg?alt=media&token=b2190bbb-4d1d-4e7f-89f5-252c2b661b3a",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/40.jpg?alt=media&token=ea11ecc7-7c81-4ca6-af83-6b67e85dbdbc",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/41.jpg?alt=media&token=c1334cc7-3220-4caa-81a8-a548b0f7dd9d",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/42.jpg?alt=media&token=401a227b-1dc0-4aef-b229-55b91c94034c",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/43.jpg?alt=media&token=ac625da8-16ec-488e-92c6-7c8aaf559cb9",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/44.jpg?alt=media&token=b60720d6-49b1-4b18-b71c-d38d1d5a3b7f",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/45.jpg?alt=media&token=a86cf00d-0bd7-4e6a-8b18-58429b047625",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/46.jpg?alt=media&token=711c891e-917f-4e41-b9ea-b7e20c3d5302",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/47.jpg?alt=media&token=cdc21825-8b8e-429c-abdf-a65cd129ac00",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/48.jpg?alt=media&token=a46c6e72-fd0e-47c4-af2b-1d47761ff8a0",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/49.jpg?alt=media&token=be969c1e-6af0-4d3e-89c2-2e7aa1ac1f7c",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/50.jpg?alt=media&token=1a94f161-deb2-417f-b1ec-0c59f68bacbb",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/51.jpg?alt=media&token=8e54900f-c20a-49b5-941f-a88659514a32",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/52.jpg?alt=media&token=d2c170e6-c57e-4e46-93a6-f8f758e81226",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/53.jpg?alt=media&token=0a0ab6d2-39e0-4cb6-9fb3-19951ef45e5c",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/54.jpg?alt=media&token=1d9a28e3-ff6c-421b-b1f4-f6f432cecb20",
    ],
 legendary:[
        
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/19.jpg?alt=media&token=8111f171-bb20-407d-b169-bb92c3a50740",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/20.jpg?alt=media&token=27da78c9-b7f4-4bb0-9017-a099fe4abee7",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/21.jpg?alt=media&token=b7c04868-2038-499b-9c14-3d6a2d01d31a",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/22.jpg?alt=media&token=c5b6eef5-87d6-4760-b2cf-a423da9d4306",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/23.jpg?alt=media&token=77a735a3-0c09-4f6d-8177-967d6d888673",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/24.jpg?alt=media&token=f92c26fd-a431-4bc1-be79-2c5a8c7a9645",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/25.jpg?alt=media&token=72bfa5ca-f0a2-460f-a42f-1eabee5c5179",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/26.jpg?alt=media&token=e997d540-9855-4318-baf2-3d047fee410d",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/27.jpg?alt=media&token=ff4a969c-3f92-4e38-8275-8f1ad7403ab7",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/28.jpg?alt=media&token=c7e1d6d9-e60f-4272-a77e-410424ff186e",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/29.jpg?alt=media&token=8aae7a4e-1e49-4ad6-b2a0-51b6e8612f4c",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/30.jpg?alt=media&token=f9820d57-1bde-4310-a7c7-a6672a1ff1c8",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/31.jpg?alt=media&token=67ba8b41-62d9-47a5-ab99-53e9d575c910",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/32.jpg?alt=media&token=ad7f5e5a-b0fe-44ff-8b19-1837a0bb649a",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/33.jpg?alt=media&token=0e846ae0-87ae-4915-a2da-09d38c6a8d35",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/34.jpg?alt=media&token=b5eb7374-2370-49f6-a291-22b4da58f353",
"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/35.jpg?alt=media&token=432614eb-5547-4609-9ab2-3f1777801023",

"https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/36.jpg?alt=media&token=2370433e-faa2-4747-9afb-4f7055935095",
    ],
}

export const DebAiCountriesList = [
    "Canada",
    "Germany",
    "Switzerland",
    "India",
    "United Kingdom",
    "United States",
    "France"
]
export const DebateMotion={

 mini: [
    "Should people be allowed to sell body parts?It's illegal to sell human organs in most countries , but some peope say changing the law could help to save lives.",
    "Are urban foxes pests?Some peope say foxes should be treated as pests,like rats.",
    "Should young peope rent toys?Some people say renting instead of buying is better for the planet.",
    "Should parents track their children?Some parents feel safer knowning where their children are at all times.",
    "Are teenagers too young to drink coffee?Some people say caffeine isn't good for young people's health.",
    "Should school ties to be scrapped?Some people feel that school ties are outdated and unnecessary.",
    "Is fake grass better than a lawn?Some people think that plastic grass is bad for the environment.",
    "Should athletes be allowed to protest?Some people say sporting competitions should be about sport- and nothing else.",
    "Is it ok to post pet videos online?Some people say it's cruel for people to post videos of pets.",
    "Is it time to change classic hot cross buns?Some people think the sticky treat is ready for an upgrade.",
    "Should Shakespeare be updated?Some think it is time to bring the writer's work up to date to make them clearer for today's audience.",
    "Should you have a weekly screen-free day?Some people say it could make you healthier and happier.",
    "Should shoes be worn indoors?Some peope say  all outdoor footwear belongs at the door.",
    "Should you read for fun every day?The number of young people reading for enjoyment is falling.",
    "Should rich countries do more to help refugees?Some say that countries with more resources could help more.",
    "Should takeaway apps be banned?Some people think the apps are harming people's health.",
    "Are emojis a good way to communicate?Some people think emojis are ruining how people interact.",
    "Should people ditch smartphones?Some say that smartphones aren't good for people's health.",
    "Are wasps treated unfairly?Some think wasps just spoil picnics but others respect them.",
    "Should cars be banned in cities?Some peope think cities should favour walking and cycling.",
    "Is exploring space worth the money?Some say that the money would be better spent closer to home.",
    "Should workers strike? Some people say it is unfailr and selfish for workders to strike.",
    "Should idleness be enouraged  ?Feeling bored and lazy might not be as bad as you think.",
    "Should homework be banned？Homework supports learning say some , but others disagree.",
    "Is it fair to ban Russian culture?Some places will no longer host Russian music ,dance and films.",
    "Is social media a suitable news source?Some say that news on social media can't always be trusted.",
    "Are school lunch periods too short?Some say lunch is an important break, but others think learning time is lost.",
    "Should children start school at a later age?Some people say that the school age should be raised to six.",
    "Should factory farming be banned?Some people say it's cruel and causes animals to suffer.",
    "Do good manners  matter?Some people think they are old-fashioned and unnecessary.",
    "Should online games be used in classroom?Some say digital learning is a useful tool, but others worry it distracts students.",
    "Is chocolate the best halloween candy?Many people think there's no better sweet than chocalate, while others say no way.",
    "Should middle and high schools have recess?Some people say all students need a break, but is there enough time in the day?",
    "Should it cost money to be a footy mascot? Some clubs charge hundreds of pounds for the opportunity.",
    
    "Should the products be made to last longer? Some people say goods should be easier to repair, too.",
    
    "Should snow days be for study? Some schools say that bad weather should no longer mean a day off.",
    
    "Should online libraries lend ebooks for free? It’s great for readers but some say it will harm the publishing industry.",
    
    "Should schools welcome parents for lunch? It’s common in the US to invite a parent or guardian for lunch.",
    
    "Do historical films need to be accurate? Some people are annoyed that the films don’t always tell the truth.",
    
    "Should grey squirrels be on the menu? One UK restaurant has started serving grey squirrel lasagne.",
    
    "Should school breaks be made longer? A report says children might benefit from longer breaks throughout the day.",
    
    "Should breakdancing be an Olympic sport? The street dance could be included in the Games in 2024.",
    
    "Do MPs deserve to be paid more money? Politicians have been given a pay rise, but not everybody is happy about it.",
    
    "Should students take part in climate strikes? Some politicians say young people should stay at school.",
    
    "Should we have a second EU referendum? There has already been one vote but some people think it’s time for another.",
    
    "Should all schools have a pet dog? Some people believe it could help pupils relax in class and cope with stress.",
    
    "Should parents ask before posting pictures? Some children think their parents should ask permission to post photos of them.",
    
    "Are Easter eggs sold too early? One charity says that supermarkets are encouraging unhealthy diets.",
    
    "Is it fair to exclude students from school? A school in North Yorkshire has stopped removing students from class.",
    
    "Should human remains in museums be returned to where they came from? Not everyone agrees that ancient bones should be kept on display.",
    
    "Should people talk more about death? It’s a difficult topic, but some people say it’s important to open up.",
    
    "Should the UK ban trophy-hunting imports? Some people say it’s time to stop animal parts being brought into the country.",
    
    "Are tourists causing more harm than good? Lots of visitors to famous locations could put these places in danger.",
    
    "Should all schools have one meat-free day? Supporters of idea say it will be better for the environment.",
    
    "Should facial-recognition tech be banned? Some schools in the US have started using cameras to scan people’s faces.",
    
    "Should we be more respectful to politicians? Some people say that we need to treat politicians better.",
    
    "Should tourists be allowed to visit the ISS? The International Space Station will open to visitors next year.",
    
    "Should the BBC licence be free for over-75s? Some people say it’s not fair to make the elderly pay to watch TV.",
    
    "Is technology ruining football games? Some people say referees are relying on video replays too much.",
    
    "Is Marmite delicious or disgusting? Some people love the famous brown spread; others hate it.",
    
    "Is it ok to stop reading a book halfway through? Cressida Cowell says it’s fine to give up on books you don’t enjoy.",
    
    "Should students choose the books they study? The number of pupils studying English at A level has dropped this year.",
    
    "Should football players quit social media? Some say social media companies need to do more to stop online abuse.",
    
    "Should people stop taking flights? Some people say that fewer trips by plane will help save the planet.",
    
    "Should Fortnite have its own World Cup? The first ever tournament was held this year in the US.",
    
    "Are film remakes unnecessary? Lots of famous films are being remade at the moment.",
    
    "Should people keep the treasure they find? Under the current rules, historical objects are usually sold to museums.",
    
    "Should classrooms have CCTV? Some people say it will improve students’ behaviour in the classroom.",
    
    "Should vehicles be banned from city centres? World Car Free Day will be marked on 22 September.",
    
    "Should loot boxes be banned for children? Some MPs have said that loot boxes in video games are a form of gambling.",
    
    "Should people spend less time at work? Working fewer days and having a longer weekend is a popular idea.",
    
    "Should theatres, museums and galleries accept money from fossil-fuel companies? Arts organisations often rely on funding from oil and gas companies.",
    
    "Is it time to ditch scary films? Not everyone enjoys being spooked by a frightening film.",
    
    "Should there be a general election? Members of Parliament have voted for an election on 12 December.",
    
    "Should heading balls be banned for under-12s? The Scottish Football Association might introduce a new rule.",
    
    "Should Christmas songs be banned in shops? One business owner says she’ll no longer play them in her store.",
    
    "Should some playground games be banned? One school in Brighton has introduced tough new rules to stop pupils playing “physical games”.",
    
    "Should bands stop going on tour? Some people say pop concerts are bad for the environment.",
    
    "Should social media apps get rid of “likes”? Some people think this would make social media users less anxious.",
    
    "Have Christmas light displays gone too far? They light up the dark winter nights, but not everyone enjoys them.",
    
    "Should there only ever be one winner? Several recent awards have crowned more than one winner.",
    
    "Should teenagers work at the weekend? Fewer young people have Saturday jobs than they did 20 years ago.",
    
    "Is it time for a new Scottish independence vote? Some politicians believe voters should have their say on Scotland’s future.",
    
    "Should schools use isolation booths? Some people think they are too harsh a punishment for students.",
    
    "Should cameras be allowed in courtrooms? Some people say that parts of criminal trials should be shown on TV.",
    
    "Should books always be kept in a good condition? People have been sharing their opinions online about the issue.",
    
    "Should athletes be allowed to use performance-enhancing technology? Some people say that athletes shouldn’t use special running shoes.",
    
    "Should great apes have similar rights as humans? Some people think they deserve more protection and better treatment.",
    
    "Should all theatres be more relaxed? Some people think the rules at theatre shows are too strict.",
    
    "Is Shakespeare the greatest writer of all time? This week schools will be celebrating the playwright’s work.",
    
    "Should people use reusable toilet roll? Some people say it is great idea, but others think it’s gross.",
    
    "Are April Fool’s pranks funny? Some people love to share a joke on this day, but others are not as amused.",
    
    "Should you have to study comic books?Some people say that comics aren’t taken seriously enough.",
    
    "Is watching films at home better than a trip to the cinema?Cinemas have better technology, but films at home can be just as good.",
    
    "Should we mine moons and planets?The US president, Donald Trump, supports plans to mine on the Moon.",
    
    "Should fast-food restaurants stick to serving meat?Some people think that vegan meals don’t belong on fast-food menus.",
    
    "Should the current football season be scrapped?With matches suspended, It’s unclear how the 2019/20 season can continue.",
    
    "Are video games good for you?Some people say they can improve our brains but others are not convinced.",
    
    "Should there be rules for baby names?A celebrity couple recently gave their son an unusual name.",
    
    "Should pupils wear uniforms at home?Some teachers say it helps students concentrate on their school work.",
    
    "Should wolves be reintroduced to Britain?Some people are worried that they could do more harm than good.",
    
    "Should people in the UK eat more British food?Some people say that more UK produce should be eaten this summer.",
    
    "Should items be rescued from the Titanic?Some people want to explore the shipwreck while there’s still time.",
    
    "Should athletes be permitted to protest?There are rules against sports stars making political statements.",
    
    "Are robotic pets better than real ones?Some people think technology can provide pets that are just as lovable.",
    
    "Is football better with a crowd?Games are currently being played inside empty stadiums.",
    
    "Is a traditional fry-up the best breakfast?Some prefer more modern options; others say the fry-up is unbeatable.",
    
    "Can a book be judged by its cover?Some bookshops want people to spend more time reading the blurbs.",
    
    "Should graffiti be considered art?A new piece of work by Banksy has been removed in London.",
    
    "Should there be a limit on wealth?Some say that the world’s richest people have too much money.",
    
    "Should museums always have set routes?New safety measures mean some museums have pre-planned trails.",
    
    "Should you read a book more than once?Some people prefer old favourites rather than trying something new.",
    
    "Is summer better than winter?Some people love long, hot summer days but other prefer a cosy, cold winter.",
    
    "Should books only use an author’s real name?A new book collection is raising awareness of female authors.",
    
    "Is it good to be bored?Some people say that having nothing to do makes us more creative.",
    
    "Is punctuation important?Some people think full stops, commas and other symbols aren’t necessary.",
    
    "Should humans trust robots?A robot has written an article in a popular UK newspaper.",
    
    "Are exams the best way to test pupils?Some people believe there are better ways to assess knowledge and ability.",
    
    "Is it better to cook food that goes further?Some people love tucking into leftover meals, but not everyone.",
    
    "Should curtseying and bowing make a comeback?Now could be a good time to consider new ways to greet one another.",
    
    "Are drive-ins the best way to enjoy events?The way people celebrate and have fun has changed this year.",
    
    "Should Halloween be celebrated? Some people love the spookiest day of the year, but not everyone.",
    
    "Is a model building better than Minecraft?More people have been making models during lockdown.",
    
    "Is it too early to turn on Christmas lights?Some people say the displays will bring festive cheer to a strange year, others think they’re wasteful.",
    
    "Are brutalist buildings awesome?Some people think they symbolize hope, others say they are ugly.",
    
    "Are virtual events as good as the real thing?Many public Christmas events are taking place online this year.",
    
    "Does a world leader’s age matter?Some people say that with age comes wisdom but not everyone agrees.",
    
    "Should there be a women’s SPOTY award?Hollie Doyle is the only woman on the shortlist for this year’s BBS Spots Personality of the Year.",
    
    "Are mince pies a tasty festive treat?There is arguably no Christmas food that splits opinion like a mince pie.",
    
    "Is January the right time to set goals?This month is when people often decide to make new resolutions.",
    
    "Should people walk where they want?In most of England, walkers are restricted to footpaths.",
    
    "Should athletes jump the vaccine queue?Some people think it is important for top-level sport to continue.",
    
    "Is fiction better than non-fiction?Some people say that true stories are better than tall tales.",
    
    "Is less foreign travel a good thing?With holidays abroad on hold, staycations might be popular.",
    
    "Is event TV better than bingeing?Some people say that traditional television is still the best.",
    
    "Is it time to stop using cash?Some people say paying by card is easier than notes and coins.",
    
    "Is country life better than city living?Some say that cities are full of life and the best places to live.",
    
    "Are dogs better than cats?A surge in pet ownership has reignited this age-old debate.",
    
    "Should children watch TV with subtitles?Research shows that watching TV with subtitles helps reading.",
    
    "Is mathematics beautiful?Maths is useful, and some people say it has great beauty too.",
    
    "Is digital art the future?Digital artworks are now going up for auction.",
    
    "Was life better in the past?Some log for the old days but others live in the moment.",
    
    "Should athletes boycott the Winter Olympics?Some say athletes should not go because of human rights abuses.",
    
    "Should New Year be celebrated in spring?Many countries mark the new year after winter is over.",
    
    "Should the UK ban short domestic flights?Some people say the UK should follow France’s example.",
    
    "Should all 16-year-olds be allowed to vote?Some say the voting age should be lowered for all UK nations.",
    
    "Should children play as they like?Some say young people should be free to play as they please.",
    
    "Should fans own football clubs?Lots of football fans want to take control of their clubs.",
    
    "Should ancient monuments be altered?Some say that old sites must be updated to attract new visitors.",
    
    "Should all adults be given free money?Wales is due to test a universal basic income scheme.",
    
    "Would you use snail slime soap?Some people say washing in snail mucus is good for the skin.",
    
    "Are villains more interesting than heroes?Some say that villains are more memorable than boring heroes.",
    
    "Should people hang portraits of the Queen?Some say the monarch represents the bad parts of British history.",
    
    "Should young people get an arts allowance?France is giving young people money to spend on culture.",
    
    "Should the school day be longer?There is talk of extending the school day in England.",
    
    "Should all pets be microchipped?The law on microchips for pets might soon be changing.",
    
    "Are fantasy tales better than realistic ones? There’s a novel for every taste.",
    
    "Should young people have summer jobs?Staff shortages mean there are job opportunities for teenagers.",
    
    "Is reducing waste better than recycling?Some say we could try harder to make less waste in the first place.",
    
    "Are there too many streaming services?Some people are frustrated by having too much choice on TV.",
    
    "Are audiobooks better than printed books?Some say listening to a book is superior to reading it on paper.",
    
    "Do emojis enrich language?Some people think the symbols are more confusing than helpful.",
    
    "Can robots replace artists?Some people believe machines can compete with sculptors.",
    
    "Should mountain visits be limited?Some people say there are too many walkers on the hillsides.",
    "Should gaming have a time limit?Some people feel that time limits would protect young people.",
    "Should first-class train travel be scrapped?A new long-distance train service has no first-class carriages.",
    "Should selfies with wild animals be banned?Some say they can harm wildlife.",
    "Should the next James Bond be female?Bond is back and some say it’s time to shake things up.",
    "Are home robots a good idea?Some people say they make our lives better but others disagree.",
    "Should slang be banned in schools?One school has banned certain words and phrases.",
    "Is formal dancing the best kind?Some people favour traditional dances, others prefer freestyle.",
    "Is space tourism a good idea?Some say Earth’s problems need to be fixed before going to space.",
    "Should drones replace fireworks?Drone displays are becoming more popular with the public.",
    "Are there too many film spin-offs?Some say there are too many films about the same characters.",
    "Should politicians be allowed second jobs?Several Members of Parliament have more than one job.",
    "Should dogs be banned from sports fields?Some people think they make too much mess in public spaces.",
    "Are fake Christmas trees best?Some people say artificial trees are better for the environment.",
    "Should all students study classics?Some say studying ancient history belongs in the past.",
    "Should all shows be “pay what you can”?At some venues people decide how much to pay for tickets.",
    "Is it ok to regift presents?Unwanted gifts are a fact of life. Some say pass them on.",



],

environment :[

    "Animals, like humans, should have rights.",
    "Everyone should switch to electric cars.",
    "Urban gardening is good for your pocket and environment.",
    "Plastics should be banned worldwide.",
    "Exports of live animals should be prohibited.",
    "Is organic farming the solution for soil pollution?",
    "Should nuclear power be used instead of fossil fuels?",
    "Is nuclear power the solution for sustainable energy production?",
    "Renewable energy sources harm the environment.",
    "Are people to blame for global warming?",
    "Is reforestation efficient in reducing global warming?",
    "Tree planting should be a mandatory activity in schools.",
    "Are Solar Panels effective in energy conservation?",
    "Is ecotourism a sustainable practice?",
    "Sustainable development should be included in the curriculum.",
    "To reduce carbon footprint, a carbon tax should be established.",
    "Is tourism good or bad for the environment?",
    "Rabbit as alternative meat.",
    "Our national parks are essential to the environment.",
"Is carpooling help in reducing carbon footprint?",
"We should build more refilling stations to avoid plastic usage.",
"Are zoos harmful to the animals?",
"Use of bidet instead of tissue papers.",
"Is there a risk to the environment from overpopulation? ",
"Being a vegetarian will help to solve global warming.",

"We can reverse climate change.",
"The selling of fur products should be banned",
'Are energy-saving life bulbs helping the environment?',
'Increase fuel prices to encourage people to switch to more energy-efficient vehicles.',
"Should mining be prohibited to preserve the environment?",
"Is global warming a myth or a fact?",
"Global warming is primarily caused by overpopulation.",
"Should government impose a law limiting the number of children in each family?",
"Nuclear power: is it a threat or protection?",
"Capitalism is the cause of pollution.",
"Urban farming is the future of agriculture and food production.",
"Are air conditioners can cause pollution?",
"Should we ban the use of pesticides?",
"Are you in favour of a penalty for leftover foods in restaurants?",
"Firecrackers should be banned.",
"Should the government invest heavily in renewable energy?",
"Is vegetarianism beneficial to one’s health?",
"Animal testing is not necessary for terms of science.",
"Organic farming is better than traditional farming.",
"Zoos should be shut down.",
"Is it possible to live in a zero-waste society?",
"Are wind farms safe for the environment?",
"Sustainable fishing is the key to saving marine life.",
"Are septic tanks beneficial?",
"Agriculture is the main cause of water pollution.",
"Are UV LED lamps the solution for Water Disinfection?",
"Installing an efficient toilet will help you conserve water.",
" Changing your lifestyle will not combat global warming.",
"The world is better without humans.",
"Nuclear energy to replace fossil fuels.",
"Climate change is a natural phenomenon not manmade.",
"Vertical farming is beneficial to the environment.",
"Solar panels should be required in each household.",
"Private cars should be banned in large cities.",
"The wealthy are more accountable for environmental harm than the poor.",
"Should Genetically Modified Organisms (GMO) be part of a sustainable agricultural economy?",
"Banning the use of single-use plastics will harm the economy.",
"It is impossible to stop climate change and its impact now.",
"Edible lawns are good for the environment.",
"Should the government tax the use of single-use plastic?",
"Social media influencers are to blame for glorifying fast fashion that is harmful to the environment.",
"Factory Farming is essential for food security.",
"Trade bans on animals: Boon or Bane?",
"Eating meat is wrong.",
"As a means of reducing environmental impact, solar energy can be used . ",
" Should biodiversity be taught as part of global warming teaching in middle schools?",
"Land degradation is caused by human-induced activities, not because of extreme weather conditions.",
"Fossil fuels, natural gas, and nuclear power are destructive to the environment.",
"Are dams good or bad for the environment?",
"Noise pollution affects marine life.",
"Should government spend more money on environmental issues rather than on poverty and the healthcare system?",
"As a result of urbanization, our environment is deteriorating.",
"Recycling is causing more trash in the environment.",
"Human diets pollute the environment and threaten the extinction of animals.",
"Science and Technology contributed a bad impact on the environment.",
],
// philososy
 philosophy:[

    "Are online privacy protections more important than safety?",
    
    "Can our senses be trusted?",
    
    "Do the benefits of direct democracy outweigh the costs?",
    
    "Is it a good thing that most human work will likely be done by machines?",
    
    "Is justice more important than peace?",
    
    "Is religious faith compatible with science?",
    
    "Is the right to privacy more important than freedom of the press?",
    
    "Is torture justifiable in the name of security?",
    
'Should "victimless crimes" remain illegal?',

"Should animal testing be banned?",

"Should cloning humans be legal?",

"Should governments impose population controls?",
"Should judges be elected by the people?",

"Should people be able to own personal vehicles?",

"Should the British Museum return artifacts to their countries of origin??",
"Should the Pavolsk Experimental Station scientists have eaten the seeds during the siege of Leningrad?",
"Should voting be compulsory?",
"Should we begin relocating people from coastlines vulnerable to climate change?",
"Should we create artificial wombs for humans?",
"Should we ever use force to create peace?",

"Was the atomic bombing of Japan justified?",
"What is the strongest argument in favor of the separation of church and state?",

"Which purpose of the criminal justice system is most important?",

"Can morality exist without religion?",

"Can we ever truly know history?",

'In "The Ones Who Walk Away from Omelas," is it morally justifiable to stay in Omelas?',

"Is it wrong to pure-breed pets?",

"Is pacifism moral?",
"Is taking care of global issues more important than caring about local issues?",

'Is there any justice in "King Lear"?',

"National Referendums: Should more laws be put to the citizens to accept or reject?",

"Should all citizens be required to vote?",

"Should animals have rights?",

"Should deepfake technology be regulated by law?",

"Should humans eat animals?",

"Should monarchies be abolished?",,

"Should people break unjust laws?",

"Should the genetic engineering of human embryos be banned?",

"Should there be a death penalty?",

"Should we admire Alexander the Great?",

"Should we change our vocabulary for referring to oppressed groups?",

"Should we discourage nationalism?",

"Was Catherine the Great an enlightened ruler?",

"What is the best mode of peaceful protest?",
'Which is better: "big" or "small" government?',

"Who decides the meaning of art?",

],
// CURRENT affairs 
currentAffairs:[

     "Which system is better at delivering stability, growth and innovation?",
      "Economic growth is the most important element in tackling global inequality",
]
}