import React from 'react'
import {
  Typography,
  Fab,
  withStyles
} from '@material-ui/core'
import DescriptionEditor from './description-editor'

const styles = {
  edit: {
    width: '80%',
    maxWidth: '40rem',
    margin: '0 auto'
  },
  container: {
    marginTop: '3rem',
    textAlign: 'center'
  },
  whiteText: {
    color: '#e0ffff'
  }
}

const AboutHeader = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive'
  }
})(Typography)

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
    const { user, about, reload } = this.props
    const admin = user && user.getId() === process.env.ADMIN_ID
    const imageStyles = {
      margin: '3rem auto',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '80%',
      maxWidth: '40rem',
      height: '40vh',
      backgroundImage: `url("${about.url}")`
    }
    return (
      <div>
        <div
          style={styles.container}
        >
          <AboutHeader
            gutterBottom
            align="center"
            variant="h3"
          >
            About Me
          </AboutHeader>
          {
            admin &&
            <Fab
              onClick={this.setEdit}
              variant="extended"
              color="secondary"
            >
              <Typography
                variant="button"
              >
                Edit About
              </Typography>
            </Fab>
          }
        </div>
        <div
          style={imageStyles}
        >
        </div>
        <div
          style={styles.edit}
        >
          {
            !this.state.edit && <div
              style={styles.container}
            >
              {
                about.text.split('\n').map((para, index) => {
                  return (
                    <React.Fragment
                      key={index}
                    >
                      <Typography
                        variant="h6"
                        align="left"
                      >
                        {
                          para
                        }
                      </Typography>
                      <br/>
                    </React.Fragment>
                  )
                })
              }
            </div>
          }
        </div>
        <div
          style={styles.edit}
        >
          {
            this.state.edit && <DescriptionEditor
              about={about}
              reload={reload}
              user={user}
              close={this.closeEdit}
            />
          }
        </div>
      </div>
    )
  }
}
