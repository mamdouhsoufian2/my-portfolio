/*!
 * Adapted from Magic UI's Orbiting Circles, featured on 21st.dev.
 * https://21st.dev/@dillionverma/components/orbiting-circles
 * https://magicui.design/r/orbiting-circles.json
 * Copyright (c) Magic UI. MIT License; see THIRD_PARTY_NOTICES.md.
 */
import { Children } from 'react';

/** Upright children orbit a shared center; dimensions are set by scoped CSS. */
export function OrbitingCircles({ children, duration = 30, reverse = false }) {
  const count = Children.count(children);

  return (
    <>
      <div className="logo-orbit-path" aria-hidden="true" />
      {Children.map(children, (child, index) => (
        <div
          className="logo-orbit-item"
          style={{
            '--orbit-duration': `${duration}s`,
            '--orbit-angle': `${(360 / count) * index + 180}deg`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
}
