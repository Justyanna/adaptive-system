import { useState } from 'react'
import { useHistory } from 'react-router'
import { createCourse } from '../../services/courses'

const AddCourseForm = () => {
  const history = useHistory()

  const [title, setTitle] = useState(null)
  const [category, setCategory] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!(title?.length > 0 && category?.length > 0)) return
    let res = await createCourse({ name: title, category })
    history.push(`/course/${res.data._id}/edit`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Nowy kurs</p>
      <div className="form-item">
        <label className="form-label" htmlFor="title">
          Tytuł kursu
        </label>
        <input
          className="form-input"
          type="text"
          id="title"
          onChange={e => setTitle(e.target.value)}
        />
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
          onChange={e => setCategory(e.target.value)}
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
