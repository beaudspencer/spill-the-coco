import React from 'react'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Menu,
  MenuItem,
  CardActions,
  withStyles,
  Fab
} from '@material-ui/core'
import {
  Add
} from '@material-ui/icons'

const styles = {
  actions: {
    margin: '0.5rem auto'
  }
}

const GreenFab = withStyles({
  root: {
    backgroundColor: '#c4e6a0'
  }
})(Fab)

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      header: '',
      description: '',
      currentId: 0,
      content: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addElement = this.addElement.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
  }
  handleChange({ target }) {
    this.setState({
      [target.id]: target.value
    })
  }
  handleContentChange({ target }, index) {
    const content = this.state.content.slice()
    const element = content.slice()[index]
    const updatedEl = Object.assign({}, element)
    updatedEl.content = target.value
    const before = content.slice(0, index)
    const after = content.slice(index + 1)
    this.setState({
      content: [...before, updatedEl, ...after]
    })
  }
  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }
  handleClose() {
    this.setState({
      anchorEl: null
    })
  }
  addElement({ target }) {
    this.handleClose()
    const content = this.state.content.slice()
    const element = {
      id: this.state.currentId.toString(),
      type: target.closest('[id]').id,
      content: ''
    }
    content.push(element)
    this.setState({
      content: content,
      currentId: this.state.currentId + 1
    })
  }
  render() {
    const { header, description, anchorEl, content } = this.state
    return (
      <div>
        <Card>
          <CardContent>
            <TextField
              id="header"
              label="header"
              fullWidth
              value={header}
              onChange={this.handleChange}
            />
            <TextField
              id="description"
              label="description"
              fullWidth
              onChange={this.handleChange}
              value={description}
            />
            {
              content.map((element, index) => {
                return (
                  <TextField
                    key={index}
                    id={element.id}
                    label={element.type}
                    fullWidth
                    multiline
                    value={content[index].content}
                    onChange={(event) => {
                      this.handleContentChange(event, index)
                    }}
                  />
                )
              })
            }
          </CardContent>
          <CardActions>
            <div
              style={styles.actions}
            >
              <GreenFab
                aria-owns={anchorEl ? 'add-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <Add/>
              </GreenFab>
              <Menu
                id="add-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem
                  id="header"
                  onClick={this.addElement}
                >
                  <Typography
                    variant="h6"
                  >
                    Header
                  </Typography>
                </MenuItem>
                <MenuItem
                  id="text"
                  onClick={this.addElement}
                >
                  <Typography
                    variant="h6"
                  >
                    Text
                  </Typography>
                </MenuItem>
                <MenuItem
                  id="img"
                  onClick={this.addElement}
                >
                  <Typography
                    variant="h6"
                  >
                    Image
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}
