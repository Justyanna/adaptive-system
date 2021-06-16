import { useState, useContext, createContext } from 'react'
import { CourseContext } from './CourseEdit'
import QuestionList from './QuestionsList'

export const TestsContext = createContext(null)

const createQuestions = title => {
  const question = {
    title: title ?? 'Pusty test',
    question: 'Puste pytanie',
    answers: [
      'Odpowiedź nr 1',
      'Odpowiedź nr 2',
      'Odpowiedź nr 3',
      'Odpowiedź nr 4'
    ],
    correct: []
  }
  return question
}

const TestEdit = ({ data, idx }) => {
  const { updateTest, saved, setSaved, setEditTest, saveChanges } =
    useContext(CourseContext)
  const [questionsList, _setQuestionsList] = useState(data.questions)
  const [test, setTest] = useState(data)

  const setQuestionsList = data => {
    _setQuestionsList(data)
    setTest({ ...test, questions: data })
  }

  const saveTest = () => {
    if (!saved) {
      updateTest(idx, test)
      saveChanges()
    }
  }

  const saveAndQuit = () => {
    saveTest()
    setEditTest(-1)
  }

  const addQuestion = (idx, questions) => {

    const tmp = questionsList
    tmp.splice(idx + 1, 0, createQuestions(null))
    setQuestionsList(tmp)
    setSaved(false)
  }

  const updateQuestion = (idx, questions) => {
    const tmp = questionsList
    tmp.splice(idx, 1, questions)
    setQuestionsList(tmp)
    setSaved(false)
  }

  const moveQuestionUp = idx => {
    const tmp = [...questionsList]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx - 1, 0, ...el)
    setQuestionsList(tmp)
    setSaved(false)
  }

  const moveQuestionDown = idx => {
    const tmp = [...questionsList]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx + 1, 0, ...el)
    setQuestionsList(tmp)
    setSaved(false)
  }

  const removeQuestion = () => {
    const tmp = [...questionsList]
    tmp.splice(idx, 1)
    setQuestionsList(tmp)
    setSaved(false)
  }

  return (
    <div>
      <header>
        <h2>{test.title}</h2>
        <p style={{ marginBottom: '0.75em' }}>{test.desc}</p>
        <button className='btn navigation' onClick={saveAndQuit}>
          {saved ? 'Wróć' : 'Zapisz i wróć'}
        </button>
        {!saved && (
          <button className='btn' onClick={saveTest}>
            Zapisz zmiany
          </button>
        )}
      </header>
      <TestsContext.Provider
        value={{
          test,
          questions: questionsList,
          setQuestionsList,
          addQuestion,
          updateQuestion,
          moveQuestionUp,
          moveQuestionDown,
          removeQuestion
        }}
      >
        <QuestionList />
      </TestsContext.Provider>
    </div>
  )
}

export default TestEdit
