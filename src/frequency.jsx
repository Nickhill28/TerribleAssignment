import React from 'react';
import Table from './tableview.jsx'
import { Card, Button, CardTitle, CardText, CardFooter,
  CardBody, Input, InputGroup } from 'reactstrap';
import axios from 'axios';
import './App.css';

class Frequent extends React.Component {

  constructor() {
      super();
      this.state={
          isSubmitted: false,
          words: [],
          value: 0,
      };
      this.frequencysubmit = this.frequencysubmit.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.frequencyChange = this.frequencyChange.bind(this);
  }

  handleBack(e){
    e.preventDefault();
    this.setState(prevState => ({
      isSubmitted: !prevState.isSubmitted,
      words: [],
      value: 0,
    }));
  }

  frequencyChange(e) {
    e.preventDefault()
    this.setState({value: e.target.value});
  }

  frequencysubmit(e) {
    e.preventDefault();
    const {value} = this.state;
    axios.get('/api/getwords/'+value)
        .then(response => {
            if(response.data){
              this.setState(prevState => ({
                isSubmitted: !prevState.isSubmitted,
                words: response.data,
              }));
            }
        })
  }

  render() {
    const {isSubmitted} = this.state;
    if(!isSubmitted) {
      return (
        <div className="App-intro">
          <Card style={{ backgroundColor: '#000',color: '#fff', borderColor: '#000', border: '10px' }}>
            <CardBody>
              <CardTitle>Frequent words</CardTitle>
              <CardText>Enter the number of Frequent words to be displayed.</CardText>
                <InputGroup>
                  <Input placeholder="No. of words" type="number" step="1" value={this.state.value} onChange={this.frequencyChange}/>
                </InputGroup>
            </CardBody>
            <CardFooter>
              <Button onClick={this.frequencysubmit} size="lg">SUBMIT</Button>
            </CardFooter>
          </Card>
        </div>
      )
    }
    else {
      return (
        <div className="App-intro">
          <Table
            tableHead = {['No.','Word','Count']}
            tableData = {this.state.words}
          />
          <Button onClick={this.handleBack} size="lg" block>BACK</Button>
        </div>
      )
    }
  }
}

export default Frequent;
