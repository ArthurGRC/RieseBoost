'use client';

import { Oval } from 'react-loader-spinner';

const CircleLoader = ({ visible = true, height = 80, width = 80, color = 'rbGray', secondaryColor = '' ,wrapperStyle = {}, wrapperClass = '' }) => {
  return (
    <Oval
      visible={visible}
      height={height}
      width={width}
      color={color}
      secondaryColor={secondaryColor}
      ariaLabel="oval-loading"
      wrapperStyle={wrapperStyle}
      wrapperClass={wrapperClass}
    />
  );
};

export default CircleLoader;
