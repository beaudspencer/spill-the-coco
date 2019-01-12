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
  IconButton,
  Fab,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core'
import {
  Add,
  Close
} from '@material-ui/icons'
import BlogPost from './blog-post'

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
      category: '',
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
    this.removeElement = this.removeElement.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
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
  handleSelect({ target }) {
    this.setState({
      [target.name]: target.value
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
  removeElement({ target }) {
    const index = parseInt(target.closest('[id]').id, 10)
    const content = this.state.content.slice()
    const before = content.slice(0, index)
    const after = content.slice(index + 1)
    this.setState({
      content: [...before, ...after]
    })
  }
  render() {
    const {
      header,
      description,
      anchorEl,
      content,
      category
    } = this.state
    return (
      <div>
        <Card>
          <CardContent>
            <FormControl
              style={{
                width: '5rem'
              }}
            >
              <InputLabel
                htmlFor="cat-sel"
              >
                Category
              </InputLabel>
              <Select
                value={category}
                onChange={this.handleSelect}
                inputProps={{
                  name: 'category',
                  id: 'cat-sel'
                }}
              >
                <MenuItem
                  value="food"
                >
                  <Typography
                    variant="h6"
                  >
                    Food
                  </Typography>
                </MenuItem>
                <MenuItem
                  value="life"
                >
                  <Typography
                    variant="h6"
                  >
                    Life
                  </Typography>
                </MenuItem>
                <MenuItem
                  value="travel"
                >
                  <Typography
                    variant="h6"
                  >
                    Travel
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="header"
              label="header"
              fullWidth
              multiline
              value={header}
              onChange={this.handleChange}
              required
            />
            <TextField
              id="description"
              label="description"
              fullWidth
              multiline
              onChange={this.handleChange}
              value={description}
              required
            />
            {
              content.map((element, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      display: 'flex'
                    }}
                  >
                    <div
                      style={{
                        width: 'fit-content',
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        marginRight: '0.5rem'
                      }}
                    >
                      <IconButton
                        style={{
                          paddingLeft: '0'
                        }}
                        id={index}
                        onClick={this.removeElement}
                      >
                        <Close/>
                      </IconButton>
                    </div>
                    <div
                      style={{
                        flex: 1
                      }}
                    >
                      <TextField
                        id={element.id}
                        label={element.type}
                        fullWidth
                        multiline
                        value={content[index].content}
                        onChange={(event) => {
                          this.handleContentChange(event, index)
                        }}
                        required
                      />
                    </div>
                  </div>
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
        <BlogPost
          post={{
            content,
            category,
            header
          }}
        />
      </div>
    )
  }
}