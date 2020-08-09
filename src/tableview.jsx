import {Table} from 'reactstrap';
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

class CustomTable extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      words : [],
    };
  }

  render() {
    const {tableHead, tableData} = this.props;
    return(
      <div className='container' style={{color:'white'}}>
        <Table dark>
          <thead>
            <tr>
              {
                tableHead.map((prop,key) => {
                  return (
                    <th>{prop}</th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
          {
            tableData.map((prop,key) => {
              return (
                <tr>
                  <th scope="row">{key+1}</th>
                  {
                    prop.map((prop,key) => {
                      return(
                        <td>{prop}</td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
          </tbody>
        </Table>
      </div>
    )
  }
}

CustomTable.propTypes = {
    tableHead: PropTypes.arrayOf(PropTypes.string)
};

export default CustomTable;
