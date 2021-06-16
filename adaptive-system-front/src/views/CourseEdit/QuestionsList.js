import { useContext } from 'react'
import { TestsContext } from './TestEdit'
import QuestionEdit from './QuestionEdit'
import styles from './CourseEdit.module.css'

const QuestionList = () => {
  const { questions, addQuestion, updateQuestion} = useContext(TestsContext)

  return (
    <section>
      {questions?.length > 0 ? (
        questions.map((question, key) => (
          <QuestionEdit question={question} idx ={key}/>) )) : (
            <div className={styles['activity-add-component']}>
            <button
            onClick={addQuestion}
              className='btn action'
            >
              Dodaj pytanie
            </button>
            
        </div>)
      }
    </section>
  )
}

export default QuestionList
