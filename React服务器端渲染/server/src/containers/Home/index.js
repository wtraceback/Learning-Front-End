import React from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";

const Home = (props) => {
    return (
        <div>
            <Header />
            <div>Hello World</div>
            <button
                onClick={() => {
                    alert("click");
                }}
            >
                click
            </button>
            <div>{props.name}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        name: state.name,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
