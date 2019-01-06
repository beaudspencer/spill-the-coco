import React from 'react'
import {
  Card,
  CardContent,
  TextField,
  Button,
  withStyles
} from '@material-ui/core'

const EditCard = withStyles({
  root: {
    height: '40vh'
  }
})(Card)

export default class EditAbout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }
  render() {
    return (
      <EditCard>
        <CardContent>
          <TextField
            id='filled-multiline-flexible'
            label='About Me'
            multiline
            fullWidth
            value={this.state.text}
            onChange={this.handleChange}
            margin="normal"
            helperText='Fill out your description'
            variant='filled'
          />
          <Button
            variant="extendedFab"
            color="secondary"
          >
            Submit
          </Button>
        </CardContent>
      </EditCard>
    )
  }
}
