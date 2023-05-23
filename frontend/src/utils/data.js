export const AI_OPTIONS = [
    {
        name: "Q&A",
        id: "q&a",
        description: "Answer questions based on existing knowledge",
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Grammer Correction",
        id: "grammerCorrection",
        description: "Corrects sentences into standard English.",
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Summarize for a 2nd grader",
        id: "summary",
        description: "Translates difficult text into simpler concepts.",
        option: {
            model: "text-davinci-003",
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "English to Other languages",
        id: "translate",
        description: "Translates English text into French, Spanish and Japanese.",
        option: {
            model: "text-davinci-003",
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Movie to Emoji",
        id: "movieToEmoji",
        description: "Convert movie titles into emoji.",
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Explain code",
        id: "explainCode",
        description: "Explain a complicated piece of code.",
        option: {
            model: "code-davinci-002",
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "JavaScript to Python",
        id: "jstopy",
        description: "Convert simple JavaScript expressions into Python.",
        option: {
            model: "code-davinci-002",
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
];

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
    ])
    
    
    
    return timeMaps.get(format)
    
} 
export const debateFormat=new Map([
    ["British Parliamentary",[2,4]],
    ["Public forum",[2]],
    ["Lincoln–Douglas",[1]],
])

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
