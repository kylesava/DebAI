import "./Loader.css"


import ReactDOM from 'react-dom';



export const Loader = () => {
    return ReactDOM.createPortal(<div className="LoaderWrapper">
        <div className='content_loader'>
            <div className="loader_plate"></div>
            <div className='image_wrapper'>

                <img width={"130px"} draggable={false} src="/images/dinasour_fly.png" alt="dinasour_welcom" />
            </div>
        </div>
    </div>, document.getElementById("loader-root")
    )
}
