# React X Modal

manage all modals in one place

## motivation

the typical way to render modal in react

- import modal component
- declare modal in JSX
- introduce a new state to control the visibility of the modal

this would become tedious when trying to manage multiple modals
react-x-modal let you open & close modals with a single method call
and pass other props to modal all at once

```js
// open
modal.open('myModal', { a: 'b' });
// close
modal.close('myModal');
```

## Install

```bash
npm i -S react-x-modal
```

## Usage

modal.js

```js
import xModal from 'react-x-modal';

const CommonModalWrap = props => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      {props.children}
      <button onClick={props.onClose}>X</button>
    </div>
  );
};

const ModalA = props => {
  return <div>this is modal a</div>;
};

const ModalBWrap = props => {
  return <div>{props.children}</div>;
};

const ModalB = props => {
  return (
    <div>
      <div>this is modal b</div>
      {/* render props passed when open */}
      {props.pass}
      <button onClick={props.onClose}>close modal b</button>
    </div>
  );
};

const modal = xModal({
  wrap: CommonModalWrap,
  mapping: {
    modalA: ModalA,
    modalB: {
      wrap: ModalBWrap,
      component: ModalB
    }
  }
});

export default modal;
```

App.js

```js
import React from 'react';
import modal from './modal';

const App = props => {
  return (
    <div>
      <button
        onClick={() => {
          modal.open('modalA');
        }}
      >
        open modal a
      </button>
      <button
        onClick={() => {
          modal.open('modalB', {
            any: 'props',
            can: 'pass',
            from: 'here'
          });
        }}
      >
        open modal b
      </button>
    </div>
  );
};
```
