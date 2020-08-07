import React from 'react';

const Audio = React.forwardRef(({ src, onError }, ref) => (
  <audio ref={ref} preload="none" onError={onError}>
    <source src={src} />
    <track kind="captions" />
    This channel is currently unavailable.
  </audio>
));

export { Audio as default };
