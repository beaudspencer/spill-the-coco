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
    backgroundColor: '#e6c2a0'
  }
})(Fab)

const Submit = withStyles({
  root: {
    backgroundColor: '#c4e6a0'
  }
})(Fab)

export default class DescriptionEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: this.props.about.url,
      text: this.props.about.text
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange({ target }) {
    this.setState({
      [target.id]: target.value
    })
  }
  handleSubmit() {
    const page = location.hash.slice(1)
    const { user } = this.props
    if (user.getId() === process.env.ADMIN_ID) {
      const requestPage = page === 'about'
        ? 'about?'
        : `category?cat=${page}&`
      fetch(`/${requestPage}id=${user.getId()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(this.props.reload())
    }
  }
  render() {
    return (
      <React.Fragment>
        <EditCard>
          <CardContent>
            {
              this.state.url && <TextField
                id="url"
                label="Image Url"
                fullWidth
                margin="normal"
                onChange={this.handleChange}
                value={this.state.url}
                variant="outlined"
              />
            }
            <TextField
              id="text"
              label="Description"
              multiline
              fullWidth
              value={this.state.text}
              onChange={this.handleChange}
              margin="normal"
              helperText="Fill out your description"
              variant="outlined"
            />
          </CardContent>
        </EditCard>
        <div
          style={styles.button}
        >
          <Submit
            onClick={this.handleSubmit}
            variant="extended"
            color="secondary"
          >
            <Typography
              variant="button"
            >
              Submit
            </Typography>
          </Submit>
          <CancelFab
            onClick={this.props.close}
          >
            <Cancel
              variant="extended"
            />
          </CancelFab>
        </div>
      </React.Fragment>
    )
  }
}
