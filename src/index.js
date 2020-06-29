import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function isComponent(t) {
  return typeof t === 'function';
}

const DefaultWrap = props => {
  return <div className="modal-x-wrap"></div>;
};

const store = {
  ready: false,
  update: () => {
    throw Error('modal-x store is not ready');
  }
};

const ModalXRoot = props => {
  const { mapping } = props;
  const [data, setData] = useState(() => {
    return Object.keys(mapping).reduce((acc, k) => {
      acc[k] = {
        show: false
      };
      return acc;
    }, {});
  });
  const onClose = useCallback(key => {
    setData(data => {
      return {
        ...data,
        [key]: {
          show: false
        }
      };
    });
  }, []);
  useEffect(() => {
    if (!store.ready) {
      store.ready = true;
      store.update = setData;
      Object.freeze(store);
    }
  }, []);

  return Object.keys(mapping).map(k => {
    const modalItem = mapping[k];
    const modalOnClose = onClose.bind(null, k);
    const isModalAComp = isComponent(modalItem);
    const Wrap = isModalAComp ? props.wrap : modalItem.wrap || props.wrap;
    const ModalComp = isModalAComp ? modalItem : modalItem.component;

    return data[k] && data[k].show ? (
      <Wrap key={k} onClose={modalOnClose}>
        <ModalComp {...data[k]} onClose={modalOnClose} />
      </Wrap>
    ) : null;
  });
};

ModalXRoot.defaultProps = {
  wrap: DefaultWrap,
  mapping: {}
};

function init(props) {
  const $root = document.createElement('div');
  $root.setAttribute('data-modal', true);
  document.body.appendChild($root);
  ReactDOM.render(<ModalXRoot {...props} />, $root);
}

const modalX = ({ wrap, mapping } = {}) => {
  init({ wrap, mapping });

  return {
    open: (key, extra) => {
      store.update(data => {
        return {
          ...data,
          [key]: {
            show: true,
            ...extra
          }
        };
      });
    },
    close: key => {
      store.update(data => {
        return {
          ...data,
          [key]: {
            show: false
          }
        };
      });
    }
  };
};

export default modalX;
