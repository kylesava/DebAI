import "./NotStartedView.css"
import UserProfile from "../../../popovers/viewprofile/UserProfile";
const NotStartedView = ({ team, pink  }) => {




    


    return (
        <div className={`NotStartedViewWrapper  ${pink && "pink"}`}>

            {

                team?.map((mem) => (
                    <UserProfile userId={mem?._id}>

                    <div className='team_member'>

                        <img src={mem?.avatar} referrerPolicy="no-referrer" alt="dino" />
                        <p>{mem.firstName} {mem.lastName}</p>
                    </div>
                    </UserProfile>
                ))
            }


        </div>
    )
}

export default NotStartedView