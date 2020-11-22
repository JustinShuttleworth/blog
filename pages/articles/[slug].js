import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {fetchEntries, fetchEntry} from "../../lib/client";
import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import marked from 'marked';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import Subscribe from "./Subscribe";
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from "@material-ui/core/Container";
import {motion} from "framer-motion"
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import RedditIcon from '@material-ui/icons/Reddit';
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  } from "react-share";
import Subscribe from "../../components/Subscribe";
import Header from "../../components/Header";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%"
  },
  content: {
    paddingRight: theme.spacing(4),
  },
  progress: {
    position: 'sticky',
    top: 0,
    height: '8px',
  },
  sidebar: {
    position: 'sticky',
    top: 20,
    borderLeft: '2px solid #2B83FC',
    marginTop: theme.spacing(1),
  },
  sidebarPadding: {
    paddingLeft: theme.spacing(2),
  },
  sidebarBlock: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  chip: {
    paddingBottom: theme.spacing(1),
  }
}));

const Post = ({post}) => {
  const classes = useStyles();
  let { file, description } = post.fields.featureImage.fields;
  const postDescription = marked(post.fields.description);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const alternatingColor = ['secondary', 'primary'];

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    setUrl(window.location.href)
  }, []);

  let progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = Math.round(totalScroll / windowHeight * 100);
    setProgress(scroll)
  }

  return (
    <>
      <Head>
        <title>{post.fields.name}</title>
        <meta
          name="description"
          content={post.fields.metaDescription}
        />
      </Head>

      <Header>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          {progress >= 5 && (
            <LinearProgress className={classes.progress} variant="determinate" color={'primary'} value={progress} />
          )}

          <Container maxWidth={'md'}>
            <Grid container>
              <Grid item md={10} className={classes.content}>
                <Typography variant={'h2'} component={'h1'}>{post.fields.name}</Typography>
              </Grid>
              <Grid item md={2}/>

              <Grid item md={10} className={classes.content}>
                <img className={classes.image} alt={description} src={`https:${file.url}`} />
                <section dangerouslySetInnerHTML={{ __html: postDescription}}/>
              </Grid>

              <Grid item md={2}>
                <div className={classes.sidebar}>
                  <div className={classes.sidebarPadding}>
                    <div className={classes.sidebarBlock}>
                      <Typography variant={'h6'}>Published</Typography>
                      <Typography variant={'caption'}>{post.fields.date.substring(0, 10)}</Typography>
                    </div>

                    <div className={classes.sidebarBlock}>
                      <Typography variant={'h6'}>Author</Typography>
                      <Typography variant={'caption'}>{post.fields.author.map(author => author.fields.name)}</Typography>
                    </div>


                    <div className={classes.sidebarBlock}>
                      <Typography variant={'h6'} gutterBottom>Tags</Typography>

                      {post.fields.tag.map((tag, index) => (
                        <div className={classes.chip} key={tag.fields.name}>
                          <Chip
                            size="small"
                            label={tag.fields.name}
                            clickable
                            color={alternatingColor[index % alternatingColor.length]}
                          />
                        </div>
                      ))}
                    </div>

                    <div className={classes.sidebarBlock}>
                      <Typography variant={'h6'}>Share</Typography>
                      <Grid container>
                        <Grid item xs={3}>
                          <FacebookShareButton url={url}>
                            <FacebookIcon color={'primary'}/>
                          </FacebookShareButton>
                        </Grid>
                        <Grid item xs={3}>
                          <RedditShareButton url={url}>
                            <RedditIcon color={'secondary'}/>
                          </RedditShareButton>
                        </Grid>
                        <Grid item xs={3}>
                          <TwitterShareButton url={url}>
                            <TwitterIcon color={'primary'}/>
                          </TwitterShareButton>
                        </Grid>
                        <Grid item xs={3}>
                          <LinkedinShareButton url={url}>
                            <LinkedInIcon color={'primary'}/>
                          </LinkedinShareButton>
                        </Grid>

                      </Grid>
                    </div>

                    <div className={classes.sidebarBlock}>
                      <Subscribe progress={progress}/>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </motion.div>
      </Header>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetchEntries()

  const paths = res.map((post) => ({
    params: { slug: post.sys.id },
  }))
  // console.log(paths)

  return { paths, fallback: false }
}


export async function getStaticProps({ params: { slug } }) {
  const res = await fetchEntry(slug)
  // console.log(res)

  const post = await res

  return {
    props: {
      post,
    },
  }
}



export default Post