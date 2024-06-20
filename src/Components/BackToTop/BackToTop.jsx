import React, { useEffect, useState } from 'react'

export default function BackToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    let backToTop =()=>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
// console.log(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
  return (
    <>
    {(showTopBtn)&&
    (<div onClick={backToTop} className='pointer greyBgColor rounded-2 p-3 position-fixed bottom-0 end-0 me-4 mb-2'>
        <i class=" fs-4 text-black fa-solid fa-arrow-up"></i>
   </div>)}
    </>
  )
}
