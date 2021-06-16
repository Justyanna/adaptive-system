import { useState, useEffect, useContext } from 'react'
import { getCourse } from '../../services/courses'
import { useParams } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Activity from './Activity'
import { adaptUser } from '../../services/users'
import Modal from '../../components/Modal/Modal'
import styles from './Course.module.css'

const cmpArr = (a, b) => {
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

const Tests = () => {
  const history = useHistory()
  const location = useLocation()
  const [course, setCourse] = useState({})
  let { courseId, testId } = useParams()
  const { user } = useContext(UserContext)
  const questions = course.tests && course.tests[testId].questions

  useEffect(
    _ => {
      ;(async _ => {
        const res = await getCourse(courseId)
        setCourse(res.data)
      })()
    },
    [courseId]
  )

  const checkAnserws = () => {
    const answers = {}
    ;[...document.querySelectorAll('input[type="checkbox"]:checked')]
      .map(e => e.id.split('a'))
      .forEach(data => {
        if (!(data[0] in answers)) answers[data[0]] = []
        answers[data[0]].push(parseInt(data[1]))
      })
    questions.forEach((q, i) => {
      const sorted = q.correct.sort((a, b) => Math.sign(a - b))
      if (!cmpArr(sorted, answers[`q${i}`])) {
        document.querySelector(`#question-${i}`).style.borderLeft =
          'solid 6px var(--c-errLight)'
      } else {
        document.querySelector(`#question-${i}`).style.borderLeft =
          'solid 6px var(--c-sucLight)'
      }
    })

    for (const box of document.querySelectorAll('input[type="checkbox"]'))
      box.disabled = true

    const btn = document.querySelector('#checkAnserws')
    btn.innerText = 'Zakończ'
    btn.onclick = e => {
      history.push(`/course/${courseId}`)
    }
  }

  return (
    <main className={`layout ${styles['question-list-item']}`}>
      <header className={styles['question-header']}>
        {questions?.length > 0 ? (
          questions.map((question, key) => (
            <div
              className='card'
              id={`question-${key}`}
              style={{
                paddingLeft: '0.5em',
                marginBottom: '1em',
                borderLeft: 'solid 6px var(--c-pLight)'
              }}
            >
              <h3>{question.question}</h3>
              <ul
                style={{
                  listStyleType: 'none',
                  padding: '1em 0',
                  margin: '0 2em'
                }}
              >
                {question.answers.map((answer, id) => (
                  <>
                    <li
                      key={key}
                      style={{
                        margin: '0.5em 0',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <input
                        type='checkbox'
                        id={`q${key}a${id}`}
                        name={`q${key}`}
                      />
                      <span style={{ marginLeft: '1em' }}>{answer}</span>
                    </li>{' '}
                  </>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <h2> Nic tu jeszcze nie ma. Ale już wkrótce... </h2>
        )}
        <button id='checkAnserws' className='btn' onClick={checkAnserws}>
          Sprawdź
        </button>
      </header>
    </main>
  )
}

export default Tests
