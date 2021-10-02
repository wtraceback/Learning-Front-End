import React from "react";

const Home = () => {
    return (
        <div>
            <div>Hello World</div>
            <button
                onClick={() => {
                    alert("click");
                }}
            >
                click
            </button>
        </div>
    );
};

export default Home;
