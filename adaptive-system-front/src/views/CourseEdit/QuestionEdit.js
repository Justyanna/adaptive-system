import { useContext, useState, useEffect } from 'react'
import styles from './CourseEdit.module.css'
import { TestsContext } from './TestEdit'
import { useParams } from 'react-router-dom'


const QuestionEdit = ({ question, idx }) => {
  const { courseId } = useParams()
  const [questionData, setQuestionData] = useState(null)

  const { questions, addQuestion, updateQuestion, removeQuestion, moveQuestionDown, moveQuestionUp} = useContext(TestsContext)

  const handleQuestionChange = (el, idx) => {
    el.setAttribute('contenteditable', true)
    el.focus()
    el.addEventListener(
      'blur',
      e => {
        el.removeAttribute('contenteditable')
        question.question = el.innerText
        updateQuestion(idx, question)
      },
      { once: true }
    )
  }

  
  const handleAnswerChange = (el, idx, key) => {
    el.setAttribute('contenteditable', true)
    el.focus()
    el.addEventListener(
      'blur',
      e => {
        el.removeAttribute('contenteditable')
        question.answers[key] = el.innerText
        updateQuestion(idx, question)
      },
      { once: true }
    )
  }

  const handleCorrectChange = (el, idx, key) => {
  
    if(question.correct.includes(key)) {
        const tmp = [... question.correct]
        tmp.splice(key, 1)
        question.correct = tmp
        el.innerText = "✘"
    }else{
        question.correct.push(key)
        el.innerText = "✔"
    }
    updateQuestion(idx, question)
  }

  const addAnser = (idx) => {
    question.answers.push(`Odpowiedź nr ${question.answers.length + 1}`)
    updateQuestion(idx, question)
  }

  const removeOption = (idx, key) => {
    const tmp = [... question.answers]
    tmp.splice(key, 1)
    question.answers = tmp
    updateQuestion(idx, question)
  }
  

  return (
    <section className={`card ${styles['question-list-item']}`}>
      <header className={styles['question-header']}>
        <h2 onClick={e => handleQuestionChange(e.target, idx)}>{question.question}</h2>
        
        <ul className={styles['component-text']}>
            {question.answers.length > 0 && question.answers.map((answer, key) => 
                <li key={key} >
                    <paragraph>
                        <span onClick={e => handleAnswerChange(e.target, idx , key)}>{answer}</span>
                        {"  "}
                        <span onClick={e => handleCorrectChange(e.target, idx , key)}>{question.correct && question.correct.includes(key) ? "✔" : "✘"}</span>
                        {"  "}
                        {"  "}
                     </paragraph>
                     <button   className={`${'btn-move-up'}`} onClick={() => removeOption(idx, key)}>Usuń opcję</button>
                </li>  
            )} 
        </ul>

        <div className={styles['lesson-ui']}>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-up'}`}
              disabled={idx < 1}
              onClick={() => moveQuestionUp(idx)}
            >
              W górę
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-down'}`}
              disabled={idx >= questions.length - 1}
              onClick={() => moveQuestionDown(idx)}
            >
              W dół
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-up'}`}
              onClick={() => addAnser(idx)}
            >
              Nowa opcja
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-del-lesson'} error`}
              onClick={removeQuestion}
            >
              Usuń
            </button>
          </div>
        </div>
      </header>
      <div className={styles['activity-add-component']}>
            <button
            onClick={addQuestion}
              className='btn action'
            >
              Dodaj pytanie
            </button>
            
        </div>
        
    </section>
  )
}

export default QuestionEdit
