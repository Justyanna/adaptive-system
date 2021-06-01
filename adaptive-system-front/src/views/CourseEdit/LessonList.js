import { useContext } from 'react'
import { CourseContext } from './CourseEdit'
import styles from './CourseEdit.module.css'

const LessonList = ({ lessons }) => {
  const {
    addLesson,
    moveLessonUp,
    moveLessonDown,
    removeLesson,
    saveChanges,
    saved,
    setEdit
  } = useContext(CourseContext)

  return (
    <div>
      {!saved && (
        <div>
          <button
            className={`btn btn-wide ${'btn-save-test'}`}
            onClick={saveChanges}
          >
            Zapisz zmiany
          </button>
        </div>
      )}
      <div>
        <button
          className={`btn btn-wide ${'btn-add-lesson'}`}
          onClick={addLesson}
        >
          Dodaj lekcję
        </button>
        <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={addLesson}
        >
          Dodaj test
        </button>
      </div>
      {lessons?.length > 0 &&
        lessons.map((lesson, key) => (
          <article key={key} className={`card ${styles['lesson-list-item']}`}>
            <div className={styles['lesson-info']}>
              <h2 className={styles['lesson-title']}>{lesson.title}</h2>
              <p className={styles['lesson-description']}>
                {lesson.description}
              </p>
              <p
                className={styles['lesson-data']}
              >{`Aktywności: ${lesson.activities.length}`}</p>
            </div>
            <div className={styles['lesson-ui']}>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-edit'}`}
                  onClick={() => setEdit(key)}
                >
                  Edytuj
                </button>
              </div>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-move-up'}`}
                  disabled={key < 1}
                  onClick={() => moveLessonUp(key)}
                >
                  W górę
                </button>
              </div>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-move-down'}`}
                  disabled={key >= lessons.length - 1}
                  onClick={() => moveLessonDown(key)}
                >
                  W dół
                </button>
              </div>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-del-lesson'} error`}
                  onClick={() => removeLesson(key)}
                >
                  Usuń
                </button>
              </div>
            </div>
            <div className={styles['ui-new-unit']}>
              <button
                className={`btn btn-wide ${'btn-add-lesson'}`}
                onClick={addLesson}
              >
                Dodaj lekcję
              </button>
              <button
                className={`btn btn-wide ${'btn-add-test'}`}
                onClick={addLesson}
              >
                Dodaj test
              </button>
            </div>
          </article>
        ))}
    </div>
  )
}

export default LessonList
