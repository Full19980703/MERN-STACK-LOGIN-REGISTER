// import React from "react";
// javascipt plugin for creating charts
import Header from "components/Headers/Header";

import React from "react";

import swal from 'sweetalert';
// @material-ui/core components
// import { useTheme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const axios = require('axios');

export default  class SMS extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  register = () => {
    console.log(this.state.username);
    axios.post('http://localhost:5001/register', {
      username: this.state.username ,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/admin/index');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }
  render(){
    return (
      <div>
        <Header />
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <OutlinedInput  type="text" name="username" value={this.state.username}  onChange={this.onChange}/>
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <OutlinedInput type="password" name="password" value={this.state.password}  onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
          <Button
            variant="outlined"
            color="primary"
            // size="small"
            disabled={this.state.username == '' && this.state.password == ''}
            onClick={this.register}>
            Primary
          </Button>
        </FormGroup>
        
        </div>
    )
  }
}

// export default Dashboard;
