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

const GreenFab = withStyles({
  root: {
    backgroundColor: '#c4e6a0',
    margin: '0.5rem auto'
  }
})(Fab)

const newPostState = {
  category: '',
  thumb: '',
  anchorEl: null,
  header: '',
  description: '',
  currentId: 0,
  content: []
}

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      localStorage.getItem('post')
        ? JSON.parse(localStorage.getItem('post'))
        : newPostState
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addElement = this.addElement.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.removeElement = this.removeElement.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleSubmit() {
    const { user } = this.props
    const { category, header, description, content, thumb } = this.state
    fetch(`/post?id=${user.getId()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category,
        thumb,
        header,
        description,
        content
      })
    })
      .then(res => {
        console.log(res.status)
        if (res.status === 500) {
          alert('server failed to post post')
        }
        else if (res.status === 403) {
          alert('forbidden request, try logging in to make post')
        }
        else {
          alert('Post created!')
        }
      })
    this.setState(newPostState)
    location.hash = '#home'
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
  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('post', JSON.stringify(this.state))
    })
  }
  render() {
    const {
      thumb,
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
              label="Title"
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
            <TextField
              id="thumb"
              label="Thumbnail"
              fullWidth
              onChange={this.handleChange}
              value={thumb}
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
                        multiline={element.type !== 'img'}
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
          </CardActions>
        </Card>
        <BlogPost
          post={{
            content,
            category,
            header
          }}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <GreenFab
            variant="extended"
            onClick={this.handleSubmit}
          >
            <Typography
              variant="button"
            >
            Submit
            </Typography>
          </GreenFab>
        </div>
      </div>
    )
  }
}
