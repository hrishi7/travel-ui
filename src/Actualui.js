
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField, ListItem, ListItemText, List} from '@material-ui/core';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Activity from './Activity'

import cities from './city.json';





export default class Actualui extends React.Component {
    constructor(){
        super();
        this.state={
            chipList:['Bangalore','Mumbai','Delhi'],
            top100Films:[],
            activities:[],
            turn:1
        }
    }

    componentDidMount = async () =>{
        await this.setState({top100Films: cities.cities});

    }

    handleChip = (chipText) =>{
      let temp = [];
          temp = [ ...this.state.chipList ];
          temp.push(chipText);
          this.setState({ chipList: temp});
    }
    handleDeleteChip = (index) =>{
        let temp = [...this.state.chipList];
        temp.splice(index,1);
        this.setState({ chipList: temp});
    }



    render(){
  return (
    <div style={{ width: 800 }}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper >
          <Autocomplete
            multiple
            options={this.state.top100Films.map(option =>  option.name)}
            // defaultValue={[top100Films[13].title]}
            freeSolo
            onChange={(event)=>{
                // console.log(event.target)
                // console.log(event.target.type);
                // console.log(event.type);
                // console.log(event.target.value);
                // console.log(event.target.textContent);
                if(event.target.type === 'text' && event.type === 'keydown'){
                    this.handleChip(event.target.value);
                }else{
                    this.handleChip(event.target.textContent);
                }
            }}
            value={this.state.chipList}
            renderTags={(value, { className, onDelete }) =>
            value.map((option, index) => (
                <Chip
                key={index}
                variant="outlined"
                data-tag-index={option}
                tabIndex={-1}
                label={option}
                className={className}
                onDelete={()=>this.handleDeleteChip(index)}
                />
            ))
            }
            renderInput={params => (
            <TextField
                {...params}
                variant="filled"
                label="Choose City"
                margin="normal"
                fullWidth
            />
            )}
        />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{maxHeight: 200, overflow: 'auto'}} >
            <List>
            {this.state.chipList.map((chip,index)=>(
                <ListItem button key={index}>
                <ListItemText primary={chip} />
                </ListItem>
            ))}
      </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
                <Activity/>
        </Grid>

        </Grid>

    </div>

  );
        }
}
