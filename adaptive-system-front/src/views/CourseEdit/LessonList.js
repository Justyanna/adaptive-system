import React from 'react'

const LessonList = ({
  lessons,
  addLesson,
  deleteLesson,
  setEdit,
  saveChanges
}) => {
  return (
    <div>
      <div>
        <button className='btn btn-save-test' onClick={saveChanges}>
          Zapisz zmiany
        </button>
      </div>
      <div>
        <button className='btn btn-add-lesson' onClick={addLesson}>
          Dodaj lekcję
        </button>
        <button className='btn btn-add-test' onClick={addLesson}>
          Dodaj test
        </button>
      </div>
      {lessons?.length > 0 &&
        lessons.map((lesson, key) => (
          <div key={key} className='card'>
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <p>{`Aktywności: ${lesson.activities.length}`}</p>
            <button className='btn' onClick={() => setEdit(key)}>
              Edytuj
            </button>
            {key > 0 && (
              <button className='btn btn-move-up'>Przesuń w górę</button>
            )}
            {key < lessons.length - 1 && (
              <button className='btn btn-move-down'>Przesuń w dół</button>
            )}
            <button className='btn btn-add-lesson' onClick={addLesson}>
              Dodaj lekcję
            </button>
            <button className='btn btn-add-test' onClick={addLesson}>
              Dodaj test
            </button>
            <button
              className='btn btn-del-lesson error'
              onClick={() => deleteLesson(key)}
            >
              Usuń
            </button>
          </div>
        ))}
    </div>
  )
}

export default LessonList
