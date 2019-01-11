import React from 'react'
import {
  withStyles,
  Typography,
  Fab
} from '@material-ui/core'
import DescriptionEditor from './description-editor'

const styles = {
  container: {
    margin: '3rem auto',
    width: '80%',
    maxWidth: '40rem'
  },
  editButton: {
    width: 'fit-content',
    margin: '3rem auto'
  }
}

const Header = withStyles({
  root: {
    fontFamily: 'Calligraffitti, cursive'
  }
})(Typography)

export default class CategoryDescription extends React.Component {
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
    const { post, reload, user } = this.props
    const admin = user && user.getId() === process.env.ADMIN_ID
    return (
      <div
        style={styles.container}
      >
        <Header
          gutterBottom
          variant="h3"
          align="center"
        >
          {
            post.post
          }
        </Header>
        <div
          style={styles.editButton}
        >
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
                  {
                    `Edit ${post.post}`
                  }
                </Typography>
              </Fab>
          }
        </div>
        {
          !this.state.edit && <div
            style={styles.container}
          >
            {
              post.text.split('\n').map((para, index) => {
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
        {
          this.state.edit && <DescriptionEditor
            about={post}
            reload={reload}
            user={user}
            close={this.closeEdit}
          />
        }
      </div>
    )
  }
}
