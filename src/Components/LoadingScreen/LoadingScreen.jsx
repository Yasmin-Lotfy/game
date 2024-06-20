

import React from "react";
import ReactLoading from "react-loading";

export default function LoadingScreen() {
return (
	<div className="text-center m-auto d-flex justify-content-center align-items-center">
	
	<ReactLoading
		type="bars"
		color="#000000"
        height={'20%'}
        width={"20%"}
	/>
	</div>
);
}
