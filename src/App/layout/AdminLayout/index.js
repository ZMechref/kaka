import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import windowSize from "react-window-size";

import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";

import "./app.scss";

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.mobileOutClickHandler = this.mobileOutClickHandler.bind(this);
    this.fullScreenExitHandler = this.fullScreenExitHandler.bind(this);
  }

  fullScreenExitHandler() {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit();
    }
  }

  componentDidMount() {
    document.addEventListener("fullscreenchange", this.fullScreenExitHandler);
    document.addEventListener("webkitfullscreenchange", this.fullScreenExitHandler);
    document.addEventListener("mozfullscreenchange", this.fullScreenExitHandler);
    document.addEventListener("MSFullscreenChange", this.fullScreenExitHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.fullScreenExitHandler);
    document.removeEventListener("webkitfullscreenchange", this.fullScreenExitHandler);
    document.removeEventListener("mozfullscreenchange", this.fullScreenExitHandler);
    document.removeEventListener("MSFullscreenChange", this.fullScreenExitHandler);
  }


 

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  render() {
    const { isFullScreen, defaultPath } = this.props;

    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
        >
          {(props) => <route.component {...props} />}
        </Route>
      ) : null;
    });

    return (
      <Aux>
        <Fullscreen enabled={isFullScreen}>
          <Navigation />
          <NavBar />
          <div
            className="pcoded-main-container"
            onClick={this.mobileOutClickHandler}
          >
            <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  <Breadcrumb />
                  <div className="main-body">
                    <div className="page-wrapper">
                      <Suspense fallback={<Loader />}>
                        <Switch>
                          {menu}
                          <Redirect from="/" to={defaultPath} />
                        </Switch>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fullscreen>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    configBlock: state.configBlock,
    layout: state.layout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout));
