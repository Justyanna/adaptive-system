import { useState } from 'react'

const AddCourseForm = () => {
  const [title, setTitle] = useState(null)
  const [category, setCategory] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Nowy kurs</p>
      <div className="form-item">
        <label className="form-label" htmlFor="title">
          Tytuł kursu
        </label>
        <input className="form-input" type="text" id="title" />
      </div>
      <div className="form-item">
        <label className="form-label" htmlFor="category">
          Kategoria
        </label>
        <input
          className="form-input"
          type="text"
          list="course-categories"
          id="category"
        />
        <datalist id="course-categories">
          <option value="Matematyka" />
          <option value="Śmieszne" />
          <option value="Życiowe" />
        </datalist>
      </div>
      <button className="btn action">Stwórz</button>
    </form>
  )
}

export default AddCourseForm
