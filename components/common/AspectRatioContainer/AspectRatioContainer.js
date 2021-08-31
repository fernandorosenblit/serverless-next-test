import { node, number, string } from 'prop-types';
import React from 'react';
import cn from 'classnames';

const AspectRatioContainer = ({ children, aspectRatio, className }) => (
  <div className={cn('aspect-ratio-container', className)}>
    <div style={{ width: '100%', paddingTop: `${aspectRatio}%` }} />
    <div className="aspect-ratio-content">{children}</div>
  </div>
);

AspectRatioContainer.propTypes = {
  children: node,
  aspectRatio: number.isRequired,
  className: string
};

export default AspectRatioContainer;
