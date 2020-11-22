import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Container} from "@material-ui/core";
import Link from "next/link";
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import {initGA, logPageView} from "../lib/analytics";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function ButtonAppBar({children}) {
  const classes = useStyles();

  useEffect(() => {
    if(!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, []);

  return (
    <>

      <div className={classes.root}>

        <AppBar position="static">
          <Container maxWidth={'md'}>
            <Toolbar style={{paddingLeft: 0, paddingRight: 0}}>

                <Typography variant="h6" className={classes.title}>
                  <Link href={'/'}>
                    <a style={{color: 'white', textDecoration: 'none'}}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                      <NightsStayRoundedIcon />
                      Web Dreamers
                      </div>
                    </a>
                  </Link>
                </Typography>


              <Link href={'/articles'}><Button color="inherit">Articles</Button></Link>
              {/*<Button color="inherit">Subscribe</Button>*/}
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      {children}
    </>
  );
}