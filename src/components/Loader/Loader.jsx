import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';

const loaderContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div style={loaderContainer}>
        <div className='sweet-loading'>
          <BounceLoader
            sizeUnit={'px'}
            size={50}
            color={'#5e72e4'}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default Loader;
