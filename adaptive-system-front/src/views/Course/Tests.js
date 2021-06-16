import { useState, useEffect, useContext } from 'react'
import { getCourse } from '../../services/courses'
import { useParams } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Activity from './Activity'
import { adaptUser } from '../../services/users'
import Modal from '../../components/Modal/Modal'
import styles from './Course.module.css'

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

  const checkAnserws = () =>{

  }


  return (
    <>
    <section className={`card ${styles['question-list-item']}`}>
      <header className={styles['question-header']}>
        {questions?.length > 0 ? (
            questions.map((question, key) => 
            <>
                <p>{question.question}</p>
                <ul
                style={{
                  listStyleType: 'none',
                  padding: '1em 0',
                  margin: '0 2em'
                }}>
                    {question.answers.map((answer, id) => (
                        <>
                        <li key={key} style={{ margin: '0.25em 0', display: 'flex' }}>
                        <input type="checkbox"/>
                            <span>
                                {answer}
                            </span>
                        </li> </>)
                    )}
              </ul> 
              </>
            )
            
        ) : (
          <h2> Nic tu jeszcze nie ma. Ale już wkrótce... </h2>
        )}
        <button className='btn' onClick={checkAnserws}>
        Sprawdź
        </button>
      </header>
      </section>
    </>
  )
}

export default Tests
