import React from 'react'
import {
  Avatar,
  withStyles,
  Typography
} from '@material-ui/core'

const styles = {
  about: {
    marginTop: '1rem'
  }
}

const BigAvatar = withStyles({
  root: {
    height: '100%',
    width: '100%',
    margin: '0 auto'
  }
})(Avatar)

export default class HomeAbout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: '100%'
    }
    this.avatar = React.createRef()
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        height: window.getComputedStyle(this.avatar.current).getPropertyValue('width')
      })
    })
    const event = new Event('resize')
    window.dispatchEvent(event)
  }
  render() {
    return (
      <div
        className="hover"
        onClick={() => {
          location.hash = 'about'
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: this.props.mobile ? '66%' : '88%'
          }}
          ref={this.avatar}
        >
          <BigAvatar
            style={{
              height: this.state.height
            }}
            src={'https://s3-us-west-1.amazonaws.com/spill-the-coco/image000000_01.jpg'}
          />
        </div>
        <div
          style={styles.about}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
          >
            About
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
          >
            Coco
          </Typography>
        </div>
      </div>
    )
  }
}
