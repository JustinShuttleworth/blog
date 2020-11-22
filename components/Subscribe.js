import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {motion} from "framer-motion"
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  inputs: {
    marginBottom: theme.spacing(1),
    width: '100%',
  }
}));

const Subscribe = ({progress}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [btn, setBtn] = useState({color: 'primary', text: 'Subscribe'})

  const submit = (e) => {
    e.preventDefault()
    const formData = {
      first: first,
      last: last,
      email: email,
    }

    emailjs.send('default_service', 'template_tnwfedv', formData, 'user_laIy9k41VeEHAySNTUU5Q')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
    });

    setBtn({color: 'secondary', text: 'Success!'})
    setEmail('')
    setFirst('')
    setLast('')
    setTimeout(
() => setBtn({color: 'primary', text: 'Subscribe'}),
10000
    );
  }

  return (
    <div>
      <form onSubmit={submit}>
        <Typography className={classes.inputs} variant={"h5"}>Subscribe</Typography>
        <TextField className={classes.inputs} label="First Name" variant="outlined" value={first} onChange={e => setFirst(e.target.value)} size="small"/>
        <TextField className={classes.inputs} label="Last Name" variant="outlined" value={last} onChange={e => setLast(e.target.value)} size="small"/>
        <TextField className={classes.inputs} label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} size="small" required/>


        {progress === 100 ? (
          <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          >
            <Button className={classes.inputs} variant="contained" color={btn.color} type={'submit'}>
              {btn.text}
            </Button>
          </motion.div>
        ) : (
          <Button className={classes.inputs} variant="contained" color={btn.color} type={'submit'}>
            {btn.text}
          </Button>
        )}
      </form>
    </div>
  )
}

export default Subscribe

