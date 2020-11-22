import Head from 'next/head'
import {motion} from "framer-motion"
import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import {Container} from "@material-ui/core";
import Header from "../components/Header";
import {fetchEntries} from "../lib/client";
import Post from "../components/Post";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import Subscribe from "../components/Subscribe";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "next/link";


const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    alignItems: 'center',
    // paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2),
  },
  previewPadding: {
    display: 'flex',
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  root: {
    display: 'flex'
  },
  meta: {
    display: 'flex',
    borderLeft: '2px solid #2B83FC',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginLeft: theme.spacing(2),
  },
  services: {
    marginBottom: theme.spacing(1),
  },
  sidebar: {
    position: 'sticky',
    top: 20,
    borderLeft: '2px solid #2B83FC',
    marginTop: theme.spacing(1),
    alignItems: 'center',
  },
  sidebarPadding: {
    paddingLeft: theme.spacing(2),
  },
  sidebarBlock: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  tags: {
    marginRight: theme.spacing(2),
  },
  bottomMargin: {
    marginBottom: theme.spacing(5),
  },
  excerpt: {
    marginBottom: theme.spacing(2),
  },
  latestGrid: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));

export default function Home({posts}) {
  const classes = useStyles();
  const alternatingColor = ['primary', 'secondary'];

  const latestPosts = posts.slice(1, 4)

  return (
    <>
      <Head>
        <title>Web Dreamers</title>
      </Head>
      <Header>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5 }}
        >
          <Container maxWidth={'md'}>
            <Grid container className={classes.bottomMargin}>
              <Grid item md={9}>
                <Link href={`/articles/${posts[0].sys.id}`}>
                  <CardActionArea className={classes.image}>
                    <img style={{width: '100%'}} src={`https:${posts[0].fields.featureImage.fields.file.url}`} />
                    <Typography variant={'h4'} component={'h1'} gutterBottom align={'justify'}>{posts[0].fields.name}</Typography>
                    <Typography className={classes.excerpt} align={'justify'}>{posts[0].fields.excerpt}</Typography>

                    <div style={{display: 'flex'}}>
                      <LocalOfferRoundedIcon color={'secondary'}/>
                      {posts[0].fields.tag.map((tag, index) => (
                        <Chip
                          className={classes.chip}
                          key={tag.fields.name}
                          size="small"
                          label={tag.fields.name}
                          clickable
                          color={alternatingColor[index % alternatingColor.length]}
                        />
                      ))}
                      <Typography style={{marginLeft: 'auto'}}>Published: {posts[0].fields.date.substring(0, 10)}</Typography>
                    </div>
                  </CardActionArea>
                </Link>

              </Grid>
              <Grid item md={3}>
                  <div className={classes.sidebar}>
                    <div className={classes.sidebarPadding}>
                      <div className={classes.sidebarBlock}>
                        <Typography variant={"h5"} className={classes.services}>Services</Typography>
                        <Chip
                          className={classes.services}
                          label='Web Design'
                          clickable
                          color={'primary'}
                        />
                        <br/>
                        <Chip
                          className={classes.services}
                          label='Power BI'
                          clickable
                          color={'secondary'}
                        />
                      </div>

                      <div className={classes.sidebarBlock}>
                        <Subscribe />
                      </div>
                    </div>
                  </div>
              </Grid>
            </Grid>

            <Typography variant={'h3'}>Latest Articles</Typography>
            <Grid container>
              {latestPosts.map(post => (
                <Grid item sm={4} className={classes.latestGrid}>
                  <Link href={`/articles/${post.sys.id}`}>
                    <CardActionArea>
                      <img src={`https:${post.fields.featureImage.fields.file.url}`} style={{width: '100%'}}/>
                      <Typography  className={classes.excerpt} variant={'h6'} align={'justify'}>{post.fields.name}</Typography>
                      {post.fields.tag.map((tag, index) => (
                        <div style={{display: 'flex'}}>
                          <LocalOfferRoundedIcon color={'secondary'}/>
                          <Chip
                            className={classes.chip}
                            key={tag.fields.name}
                            size="small"
                            label={tag.fields.name}
                            clickable
                            color={alternatingColor[index % alternatingColor.length]}
                          />
                        </div>
                      ))}
                    </CardActionArea>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </motion.div>
      </Header>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p
  })

  return {
    props: {
      posts,
    },
  }
}
