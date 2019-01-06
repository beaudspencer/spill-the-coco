import React from 'react'
import {
  Typography,
  Button
} from '@material-ui/core'
import EditAbout from './edit-about'

const styles = {
  edit: {
    width: '80%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  container: {
    marginTop: '3rem',
    textAlign: 'center'
  },
  image: {
    margin: '3rem auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '80%',
    height: '20rem',
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQdEoLRyJtupcwF2-wC0_29EvlhQNJ9hYJd-SCoFrfP_ZBYeD")'
  }
}

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
    this.setEdit = this.setEdit.bind(this)
  }
  setEdit() {
    this.setState({
      edit: true
    })
  }
  render() {
    const { admin } = this.props
    return (
      <div>
        <div
          style={styles.container}
        >
          <Typography
            gutterBottom
            align="center"
            variant="h2"
          >
            About Me
          </Typography>
          {
            admin &&
            <Button
              onClick={this.setEdit}
              variant="extendedFab"
              color="secondary"
            >
              Edit About
            </Button>
          }
        </div>
        <div
          style={styles.image}
        >
        </div>
        <div
          style={styles.container}
        >
          <Typography
            align="center"
          >
            {
              this.props.text
            }
          </Typography>
        </div>
        <div
          style={styles.edit}
        >
          {
            this.state.edit && <EditAbout/>
          }
        </div>
      </div>
    )
  }
}
