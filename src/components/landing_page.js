import React, {  useState, useEffect } from "react";
import LandingScreen from "./landing_screen";
import Browse from "./browse";
import {useLocation} from "react-router-dom";
import ScrollToTop from "./scroll_to_top";

const DEFAULT_BROWSE_CATEGORY = 'new'

function getCategoryFromLocation(location){
    if(!location||!location.pathname){
        return DEFAULT_BROWSE_CATEGORY;
    }else{
        if (location.pathname==='/'){
            return DEFAULT_BROWSE_CATEGORY;
        }else{
            let category = location.pathname.substr(1)
            
            return category
        } 
    }
}


function LandingPage({originUrl}){
    
    let location = useLocation();
    const [category, setCategory] = useState(getCategoryFromLocation(location));

    let tmp_cat = getCategoryFromLocation(location);
    if (tmp_cat!==category){
        setCategory(tmp_cat);
    }
    useEffect(() => {
        if((location?.pathname!=="/")){
            window.setTimeout(() => {
                const id = 'browse_sites'
                let element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({block: "start",
                    inline: "center",
                    behavior: "smooth",
                    alignToTop: true});
                    
                }
              }, 50); 
        }
    },[location?.pathname]);

    
    return (
    <>{ ((location===undefined||(location?.pathname==="/"))&&(<ScrollToTop/>))||(null)}
        <LandingScreen originUrl={originUrl}/>
        <Browse category={category} setCategory={setCategory} originUrl={originUrl} />
    </>
    )

}

export default LandingPage;