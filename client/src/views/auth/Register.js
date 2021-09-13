import React from "react";
// import { Redirect } from "react-router";
import swal from 'sweetalert';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import School from "@material-ui/icons/School";

// core components
import componentStyles from "assets/theme/views/auth/register.js";

const axios = require('axios');

const useStyles = makeStyles(componentStyles);

function Register() {
  const classes = useStyles();
  const theme = useTheme();
  
  const [ username, setUsername ] = React.useState('') ;
  const [ password, setPassword ] = React.useState('') ;
  const [ email , setEmail ] = React.useState('') ;
  
  const getCurrentDate = () => {
    var d = new Date() ;
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${day}/${month}/${year}`;
  }

  const toRegister = () => {
    axios.post('http://localhost:5001/register', {
      username: username,
      password: password,
      email : email ,
      created_at : getCurrentDate()
    }).then((res) => {
      if(res.data.status == 200){
        swal({
          text: res.data.message,
          icon: "success",
          type: "success"
        });
      }
      if(res.data.status == 401){
        swal({
          text: res.data.message,
          icon: "error",
          type: "error"
        });
      }
      this.props.history.push('/auth/login');
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize="140%"
                fontWeight="400"
                // component="small"
                // color={theme.palette.gray[600]}
              >
                Or Sign up with
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
          ></CardHeader>
          <CardContent classes={{ root: classes.cardContent }}>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Username"
                startAdornment={
                  <InputAdornment position="start">
                    <School />
                  </InputAdornment>
                }
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="email"
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label={
                <>
                  I agree with the{" "}
                  <Box
                    color={theme.palette.primary.main}
                    component="a"
                    textDecoration="none"
                  >
                    Privacy Policy
                  </Box>
                </>
              }
              labelPlacement="end"
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained" onClick={toRegister}>
                Create account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Register;
