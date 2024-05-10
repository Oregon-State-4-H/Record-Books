import styles from './styles.module.css';

/**
 * OverlayModel component
 * @param {JSX.Element} children - The child elements to be displayed in the model
 * @param {function} handleClose - The function to close the model
 * @param {object} frameStyles - The styles for the model frame
 */
export function OverlayModel({ children, handleClose, frameStyles, title }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modelFrame} style={frameStyles}>
        <button type="cancel" id={styles.closeBtn} onClick={handleClose}>X</button>
        <h2 id={styles.modelTitle}>{title}</h2>
        {children}
      </div>
    </div>
  )
}