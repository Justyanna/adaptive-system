import styles from './Course.module.css'

const Lesson = ({ contents }) => {
  return (
    <div className={`card flow ${styles.activity}`}>
      {contents.map((content, key) => {
        switch (content.type) {
          case 'src':
            return (
              <img
                className={styles.img}
                src={content.data}
                alt={content.type}
                key={key}
              />
            )
          case 'text':
            return <div key={key}>{content.data}</div>
          default:
            return <></>
        }
      })}
    </div>
  )
}

export default Lesson
