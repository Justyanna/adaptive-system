import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { createCourse } from '../../services/courses'
import { getCategoryList } from '../../services/courses'

const AddCourseForm = () => {
  const history = useHistory()

  const [categoryList, setCategoryList] = useState(null)
  const [title, setTitle] = useState(null)
  const [category, setCategory] = useState(null)

  useEffect(_ => {
    let mounted = true
    getCategoryList().then(({ data }) => {
      if (mounted) setCategoryList(data)
    })
    return () => {
      mounted = false
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!(title?.length > 0 && category?.length > 0)) return
    let res = await createCourse({ name: title, category })
    history.push(`/course/${res.data._id}/edit`)
  }

  return (
    <form className='flow' onSubmit={handleSubmit}>
      <h2>Nowy kurs</h2>
      <div className='form-item'>
        <label className='form-label' htmlFor='title'>
          Tytuł kursu
        </label>
        <input
          className='form-input form-input-wide'
          type='text'
          id='title'
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className='form-item'>
        <label className='form-label' htmlFor='category'>
          Kategoria
        </label>
        <input
          className='form-input form-input-wide'
          type='text'
          list='course-categories'
          id='category'
          onChange={e => setCategory(e.target.value)}
        />
        <datalist id='course-categories'>
          {categoryList?.length > 0 &&
            categoryList.map((category, key) => (
              <option value={category} key={key} />
            ))}
        </datalist>
      </div>
      <button className='btn action'>Stwórz</button>
    </form>
  )
}

export default AddCourseForm
