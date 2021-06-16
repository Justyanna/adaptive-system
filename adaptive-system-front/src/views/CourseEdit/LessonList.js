import { useContext } from 'react'
import { CourseContext } from './CourseEdit'
import styles from './CourseEdit.module.css'

const LessonList = ({ lessons, tests }) => {
  const {
    addLesson,
    updateLesson,
    moveLessonUp,
    moveLessonDown,
    removeLesson,
    addTest,
    updateTest,
    removeTest,
    moveTestsDown,
    moveTestUp,
    saveChanges,
    saved,
    setEditLesson,
    setEditTest
  } = useContext(CourseContext)

  const handleLessonNameChange = (el, idx) => {
    el.setAttribute('contenteditable', true)
    el.focus()
    el.addEventListener(
      'blur',
      e => {
        el.removeAttribute('contenteditable')
        lessons[idx].title = el.innerText
        updateLesson(idx, lessons[idx])
      },
      { once: true }
    )
  }

  const handleLTestsNameChange = (el, idx) => {
    el.setAttribute('contenteditable', true)
    el.focus()
    el.addEventListener(
      'blur',
      e => {
        el.removeAttribute('contenteditable')
        tests[idx].title = el.innerText
        updateTest(idx, tests[idx])
      },
      { once: true }
    )
  }

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
      <div style={{ marginTop: '0.75em' }}>
        <button
          className={`btn btn-wide ${'btn-add-lesson'}`}
          onClick={addLesson}
        >
          Dodaj lekcję
        </button>
        <button
          className={`btn btn-wide ${'btn-add-lesson'}`}
          onClick={addTest}
        >
          Dodaj test
        </button>
        {/* <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={addLesson}
        >
          Dodaj test
        </button> */}
      </div>
      {lessons?.length > 0 &&
        lessons.map((lesson, key) => (
          <article key={key} className={`card ${styles['lesson-list-item']}`}>
            <div className={styles['lesson-info']}>
              <h2
                className={styles['lesson-title']}
                onClick={e => handleLessonNameChange(e.target, key)}
              >
                {lesson.title}
              </h2>
              <p
                className={styles['lesson-description']}
                style={{ fontStyle: 'italic' }}
              >
                {lesson.description}
              </p>
              <p
                className={styles['lesson-data']}
                style={{ marginTop: '0.5rem' }}
              >
                <strong>Aktywności:</strong> {lesson.activities.length}
              </p>
            </div>
            <div className={styles['lesson-ui']}>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-edit'} navigation`}
                  onClick={() => setEditLesson(key)}
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
              {/* <button
                className={`btn btn-wide ${'btn-add-test'}`}
                onClick={addLesson}
              >
                Dodaj test
              </button> */}
            </div>
          </article>
        ))}

      {tests?.length > 0 &&
        tests.map((test, key) => (
          <article key={key} className={`card ${styles['lesson-list-item']}`}>
            <div className={styles['lesson-info']}>
              <h2
                className={styles['lesson-title']}
                onClick={e => handleLTestsNameChange(e.target, key)}
              >
                {test.title}
              </h2>
              <p className={styles['lesson-description']}>{test.desc}</p>
            </div>
            <div className={styles['lesson-ui']}>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-edit'} navigation`}
                  onClick={() => setEditTest(key)}
                >
                  Edytuj
                </button>
              </div>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-move-up'}`}
                  disabled={key < 1}
                  onClick={() => moveTestUp(key)}
                >
                  W górę
                </button>
              </div>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-move-down'}`}
                  disabled={key >= tests.length - 1}
                  onClick={() => moveTestsDown(key)}
                >
                  W dół
                </button>
              </div>
              <div className={styles['lesson-ui-item']}>
                <button
                  className={`btn btn-wide ${'btn-del-lesson'} error`}
                  onClick={() => removeTest(key)}
                >
                  Usuń
                </button>
              </div>
            </div>
            <div className={styles['ui-new-unit']}>
              <button
                className={`btn btn-wide ${'btn-add-lesson'}`}
                onClick={addTest}
              >
                Dodaj test
              </button>
              {/* <button
                className={`btn btn-wide ${'btn-add-test'}`}
                onClick={addLesson}
              >
                Dodaj test
              </button> */}
            </div>
          </article>
        ))}
    </div>
  )
}

export default LessonList
