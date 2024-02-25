import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import windowSize from 'react-window-size';

import Aux from '../../../../../../hoc/_Aux';
import NavIcon from './../NavIcon';
import NavBadge from './../NavBadge';
import * as actionTypes from '../../../../../../store/actions';

class NavItem extends Component {
  render() {
    const { item, layout, windowWidth, onItemLeave, onItemClick } = this.props;

    let itemTitle = item.title;
    if (item.icon) {
      itemTitle = <span className="pcoded-mtext">{item.title}</span>;
    }

    let itemTarget = '';
    if (item.target) {
      itemTarget = '_blank';
    }

    let subContent;
    if (item.external) {
      subContent = (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <NavIcon items={item} />
          {itemTitle}
          <NavBadge layout={layout} items={item} />
        </a>
      );
    } else {
      subContent = (
        <NavLink to={item.url} className="nav-link" exact={true} target={itemTarget}>
          <NavIcon items={item} />
          {itemTitle}
          <NavBadge layout={layout} items={item} />
        </NavLink>
      );
    }

    let mainContent = '';
    if (layout === 'horizontal') {
      mainContent = <li onClick={onItemLeave}>{subContent}</li>;
    } else {
      mainContent = <li className={item.classes}>{subContent}</li>;
      if (windowWidth < 992) {
        mainContent = (
          <li className={item.classes} onClick={onItemClick}>
            {subContent}
          </li>
        );
      }
    }

    return <Aux>{mainContent}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
    collapseMenu: state.collapseMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    onItemLeave: () => dispatch({ type: actionTypes.NAV_CONTENT_LEAVE }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(windowSize(NavItem)));
