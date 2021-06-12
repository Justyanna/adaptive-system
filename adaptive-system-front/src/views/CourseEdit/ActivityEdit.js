import { useContext, useState, useEffect } from 'react'
import styles from './CourseEdit.module.css'
import { LessonContext } from './LessonEdit'
import Modal from '../../components/Modal/Modal'
import Dropzone from 'react-dropzone'
import { getFile, uploadFile } from '../../services/file'
import { useParams } from 'react-router-dom'

const oppositeMode = {
  alpha: 'gamma',
  beta: 'delta',
  gamma: 'alpha',
  delta: 'beta'
}

const ActivityEdit = ({ activity, idx }) => {
  const { courseId } = useParams()
  const [activityData, setActivityData] = useState(null)
  const [images, setImages] = useState({})

  const {
    activities,
    addActivity,
    updateActivity,
    moveActivityUp,
    moveActivityDown,
    removeActivity
  } = useContext(LessonContext)

  const [modal, showModal] = useState(false)

  const addTextComponent = (type, mode) => {
    const tmp = { ...activity }
    tmp[mode] = [
      ...activity[mode],
      { type: 'text', contents: 'Komponent tekstowy' }
    ]
    updateActivity(idx, tmp)
    return
  }

  const openImageDialog = (type, mode) => {
    setActivityData({ type, mode })
    showModal(true)
  }

  const addImageComponent = async image => {
    let mode = activityData.mode
    const {
      data: { fileId }
    } = await uploadFile(image, courseId)
    const tmp = { ...activity }
    tmp[mode] = [...activity[mode], { type: 'img', contents: fileId }]
    updateActivity(idx, tmp)
    return
  }

  const updateComponent = (i, value) => {
    const tmp = activity
    tmp[activity.mode][i].contents = value
    updateActivity(idx, tmp)
  }

  const removeComponent = i => {
    const tmp = activity
    tmp[activity.mode].splice(i, 1)
    updateActivity(idx, tmp)
  }

  const swapMode = () => {
    const tmp = activity
    tmp.mode = oppositeMode[activity.mode]
    updateActivity(idx, tmp)
  }

  const setWeight = w => {
    const tmp = activity
    tmp.weight = w
    updateActivity(idx, tmp)
  }

  const loadImage = async id => {
    document.querySelector(
      `img#img-${id}`
    ).src = `http://localhost:8080/img/${id}`
  }

  useEffect(() => {
    activity?.components
      ?.filter(({ type }) => type === 'img')
      ?.forEach(({ contents: id }) => {
        loadImage(id)
      })
  }, [activity])

  return (
    <section className={`card ${styles['activity-list-item']}`}>
      <header className={styles['activity-header']}>
        <h2>{activity.title}</h2>
        {activity.weight && (
          <div>
            Jak ważna jest ta aktywność? 
            <input
              type='radio'
              name={`weight-${idx}`}
              id={`weight-${idx}-0`}
              defaultChecked={activity.weight <= 0.2}
              onChange={() => setWeight(0.2)}
            />
             
            <input
              type='radio'
              name={`weight-${idx}`}
              id={`weight-${idx}-1`}
              defaultChecked={activity.weight > 0.2 && activity.weight <= 0.4}
              onChange={() => setWeight(0.4)}
            />
             
            <input
              type='radio'
              name={`weight-${idx}`}
              id={`weight-${idx}-2`}
              defaultChecked={activity.weight > 0.4 && activity.weight <= 0.5}
              onChange={() => setWeight(0.6)}
            />
             
            <input
              type='radio'
              name={`weight-${idx}`}
              id={`weight-${idx}-3`}
              defaultChecked={activity.weight > 0.6 && activity.weight <= 0.8}
              onChange={() => setWeight(0.8)}
            />
             
            <input
              type='radio'
              name={`weight-${idx}`}
              id={`weight-${idx}-4`}
              defaultChecked={activity.weight > 0.8}
              onChange={() => setWeight(1.0)}
            />
             
          </div>
        )}
        <div className={styles['lesson-ui']}>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-up'}`}
              disabled={idx < 1}
              onClick={() => moveActivityUp(idx)}
            >
              W górę
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-down'}`}
              disabled={idx >= activities.length - 1}
              onClick={() => moveActivityDown(idx)}
            >
              W dół
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-del-lesson'} error`}
              onClick={removeActivity}
            >
              Usuń
            </button>
          </div>
        </div>
      </header>
      {activity.type === 'essential' && (
        <div>
          <h3>Aktywność kluczowa</h3>
          {activity.components?.length > 0 && (
            <div className={styles['component-list']}>
              {activity.components.map((component, key) => (
                <div key={key}>
                  <button
                    className='btn error'
                    onClick={() => removeComponent(key)}
                  >
                    Usuń
                  </button>
                  {component.type === 'text' && (
                    <textarea
                      className={styles['component-text']}
                      defaultValue={component.contents}
                      onBlur={e => updateComponent(key, e.target.value)}
                    />
                  )}
                  {component.type === 'img' && (
                    <p>
                      <img src='tmp' id={`img-${component.contents}`} />
                    </p>
                  )}
                  {component.type !== 'text' && component.type !== 'img' && (
                    <p>Element wymaga implementacji</p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className={styles['activity-add-component']}>
            <button
              className='btn action'
              onClick={() => addTextComponent('essential', activity.mode)}
            >
              Dodaj tekst
            </button>
            <button
              className='btn action'
              onClick={() => openImageDialog('essential', activity.mode)}
            >
              Dodaj grafikę
            </button>
          </div>
        </div>
      )}
      {activity.type === 'contextual' && (
        <div>
          <h3>Aktywność kontekstowa</h3>
          <div>
            <button className='btn' onClick={swapMode}>
              {oppositeMode[activity.mode]}
            </button>
          </div>
          {activity[activity.mode]?.length > 0 && (
            <div className={styles['component-list']}>
              {activity[activity.mode].map((component, key) => (
                <div key={key}>
                  <button
                    className='btn error'
                    onClick={() => removeComponent(key)}
                  >
                    Usuń
                  </button>
                  <textarea
                    className={styles['component-text']}
                    defaultValue={component.contents}
                    onBlur={e => updateComponent(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={styles['activity-add-component']}>
            <button
              className='btn action'
              onClick={() => addTextComponent('contextual', activity.mode)}
            >
              Dodaj tekst
            </button>
            <button
              className='btn action'
              onClick={() => openImageDialog('contextual', activity.mode)}
            >
              Dodaj grafikę
            </button>
          </div>
        </div>
      )}
      {activity.type === 'special' && (
        <div>
          <h3>Aktywność specjalna</h3>
          <div>
            <button className='btn' onClick={swapMode}>
              {oppositeMode[activity.mode]}
            </button>
          </div>
          {activity[activity.mode]?.length > 0 && (
            <div className={styles['component-list']}>
              {activity[activity.mode].map((component, key) => (
                <div key={key}>
                  <button
                    className='btn error'
                    onClick={() => removeComponent(key)}
                  >
                    Usuń
                  </button>
                  <textarea
                    className={styles['component-text']}
                    defaultValue={component.contents}
                    onBlur={e => updateComponent(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={styles['activity-add-component']}>
            <button
              className='btn action'
              onClick={() => addTextComponent('special', activity.mode)}
            >
              Dodaj tekst
            </button>
            <button
              className='btn action'
              onClick={() => openImageDialog('special', activity.mode)}
            >
              Dodaj grafikę
            </button>
          </div>
        </div>
      )}
      <div className={styles['ui-new-unit']}>
        <button
          className={`btn btn-wide ${'btn-add-lesson'}`}
          onClick={() => addActivity(idx, 'essential')}
        >
          Kluczowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={() => addActivity(idx, 'contextual')}
        >
          Kontekstowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={() => addActivity(idx, 'special')}
        >
          Specjalna
        </button>
      </div>
      <Modal visible={modal} setVisible={showModal}>
        <Dropzone
          onDrop={([file]) => addImageComponent(file)}
          accept={'image/jpeg, image/png'}
          maxFiles={1}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <h2 style={{ textAlign: 'center', paddingBottom: '0.5em' }}>
                {activity.title}
              </h2>
              <p
                style={{
                  padding: '1.5em 1em',
                  textAlign: 'center',
                  outline: 'dashed 2px #CCC'
                }}
              >
                Przeciągnij tu obraz
                <br /> lub kliknij by wybrać plik z dysku.
              </p>
            </div>
          )}
        </Dropzone>
      </Modal>
    </section>
  )
}

export default ActivityEdit
