import React from "react";
// import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";

const axios = require('axios');

const useStyles = makeStyles(componentStyles);

function Login() {
  const classes = useStyles();
  const theme = useTheme();

  const [ username, setUsername ] = React.useState('') ;
  const [ password, setPassword ] = React.useState('');

  const toLogin = () => {
    axios.post('http://localhost:5001/login', {
      username: username ,
      password: password,
    }).then((res) => {
      if(res.data.status == 401 || res.data.status == 402 ){
        swal({
          text : res.data.message ,
          icon : "error"
        });
      }
      if(res.data.status == 200){
        console.log("Ddd");
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.id);
        const willGoToIndex = swal({
          title : "Success" ,
          text: res.data.message,
          icon: "success",
          type: "success"
        });
        if(willGoToIndex) window.location.href = "/admin/index";
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
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
                Please Login into my website.
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
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label="Remeber me"
              labelPlacement="end"
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained" onClick={toLogin}>
                Sign in
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Login;
