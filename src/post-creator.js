import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  TextField
} from '@material-ui/core'

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: '',
      description: '',
      content: []
    }
  }
  render() {
    const { header, description } = this.state
    return (
      <div>
        <Card>
          <CardContent>
            <TextField
              label="header"
              fullWidth
              value={header}
            />
            <TextField
              label="description"
              fullWidth
              value={description}
            />
          </CardContent>
          <CardActionArea>
            <CardActions>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
    )
  }
}
