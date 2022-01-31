import css from "./header.css";

export const header = (function(){
    // const content = document.querySelector('content')
    const body = document.querySelector('body');
    
    const addHeader = (text)=>{
 
         // creating a header element
         const header = document.createElement('header');
         header.innerHTML = text;
         
         // adding header with it's HTML content to the page
         body.appendChild(header);
    };
 
    return {addHeader};

})();
