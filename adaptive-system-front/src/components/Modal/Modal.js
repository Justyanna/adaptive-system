import styles from './Modal.module.css'

const Modal = ({ children, visible, setVisible }) => {
  if (!visible) return <></>

  return (
    <div className={styles['modal']} onClick={e => setVisible(false)}>
      <div
        className={`${styles['modal-contents']} flow`}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
