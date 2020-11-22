import {fetchEntries} from "../../lib/client";
import Header from "../../components/Header";
import React from "react";
import {Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import {motion} from "framer-motion";
import Head from "next/head";


const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    alignItems: 'center',
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

const Articles = ({posts}) => {
  const classes = useStyles();
  const alternatingColor = ['primary', 'secondary'];

  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>

      <Header>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          <Container maxWidth={"md"}>
            {posts.map((p) => (
              <Link href={`/articles/${p.sys.id}`} key={p.sys.id}>
                <CardActionArea>
                  <div key={p.fields.name}>
                    <Grid container>
                      <Grid className={classes.root} item md={4}>
                        <img className={classes.image} src={`https:${p.fields.featureImage.fields.file.url}`} />
                      </Grid>
                      <Grid item md={8} style={{display: 'flex'}}>
                        <div className={classes.previewPadding}>
                          <div>
                            <Typography variant={'h4'} component={'h1'}>{p.fields.name}</Typography>
                            {p.fields.tag.map((tag, index) => (
                                <Chip
                                  className={classes.chip}
                                  key={tag.fields.name}
                                  size="small"
                                  label={tag.fields.name}
                                  clickable
                                  color={alternatingColor[index % alternatingColor.length]}
                                />
                            ))}
                            <Typography>{p.fields.excerpt}</Typography>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </CardActionArea>
              </Link>
            ))}
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

export default Articles