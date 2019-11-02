import React from 'react';

class PanelHeader extends React.Component {
  render() {
    return (
      <div className='panel-header' style={{ backgroundColor: '#172029' }}>
        {this.props.content}
      </div>
    );
  }
}

export default PanelHeader;
