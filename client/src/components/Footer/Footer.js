/*eslint-disable*/
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/profile" className={classes.block} target="_blank">
                مكاتب العمل
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/job" className={classes.block} target="_blank">
                الوظائف
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/about" className={classes.block} target="_blank">
                عن الشعبة
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <a href="" className={aClasses} target="_blank">
            Team
          </a>{" "}
          &copy; {1900 + new Date().getYear()}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
