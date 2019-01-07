import React from 'react'
import {
  Typography,
  Fab
} from '@material-ui/core'
import EditAbout from './edit-about'

const styles = {
  edit: {
    width: '80%',
    position: 'absolute',
    left: '50%',
    top: '90%',
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
    maxWidth: '30rem',
    height: '20rem',
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQdEoLRyJtupcwF2-wC0_29EvlhQNJ9hYJd-SCoFrfP_ZBYeD")'
  },
  whiteText: {
    color: '#e0ffff'
  }
}

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
    this.setEdit = this.setEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
  }
  setEdit() {
    this.setState({
      edit: true
    })
  }
  closeEdit() {
    this.setState({
      edit: false
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
            variant="h4"
          >
            About Me
          </Typography>
          {
            admin &&
            <Fab
              onClick={this.setEdit}
              variant="extended"
              color="secondary"
            >
              <Typography
                style={styles.whiteText}
                variant="button"
              >
                Edit About
              </Typography>
            </Fab>
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
            variant="h6"
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
            this.state.edit && <EditAbout
              close={this.closeEdit}
            />
          }
        </div>
      </div>
    )
  }
}
