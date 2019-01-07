import React from 'react'
import {
  Card,
  CardContent,
  TextField,
  Fab,
  withStyles,
  Typography
} from '@material-ui/core'
import {
  Cancel
} from '@material-ui/icons'

const styles = {
  button: {
    width: 'fit-content',
    margin: '3rem auto'
  },
  whiteText: {
    color: '#e0ffff'
  }
}

const EditCard = withStyles({
  root: {
    backgroundColor: '#f3f3f3'
  }
})(Card)

const CancelFab = withStyles({
  root: {
    height: '48px',
    width: '48px',
    marginLeft: '1rem',
    backgroundColor: '#de1c11'
  }
})(Fab)

export default class EditAbout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }
  handleSubmit() {
    const { user } = this.props
    if (user.getId() === process.env.ADMIN_ID) {
      fetch(`/about?id=${user.getId()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
    }
  }
  render() {
    return (
      <React.Fragment>
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
              variant='outlined'
            />
          </CardContent>
        </EditCard>
        <div
          style={styles.button}
        >
          <Fab
            onClick={this.handleSubmit}
            variant="extended"
            color="secondary"
          >
            <Typography
              variant="button"
              style={styles.whiteText}
            >
              Submit
            </Typography>
          </Fab>
          <CancelFab
            onClick={this.props.close}
          >
            <Cancel
              style={styles.whiteText}
              variant="extended"
            />
          </CancelFab>
        </div>
      </React.Fragment>
    )
  }
}
