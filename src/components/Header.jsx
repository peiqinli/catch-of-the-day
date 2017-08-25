import React from 'react';
// stateless functional components means if you just want a render function
// instead of render with bunch of function. it is not necessary to create
// a component

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  )

}


export default Header