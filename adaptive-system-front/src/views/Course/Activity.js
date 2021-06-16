import { useContext, useEffect } from 'react'
import styles from './Course.module.css'
import Component from "./Component"
import { UserContext } from '../../contexts/UserContext'

const Activity = ({activity}) => {
    const { user } = useContext(UserContext)
    const loadImage = async id => {
        document.querySelector(
          `img#img-${id}`
        ).src = `http://localhost:8080/img/${id}`
      }
        
  const loadVideo = id => {
    console.log(id)
    document.querySelector(
      `video#video-${id}`
    ).src = `http://localhost:8080/img/${id}`
  }
      useEffect(() => {
        activity?.components
          ?.filter(({ type }) => type === 'img')
          ?.forEach(({ contents: id }) => {
            loadImage(id)
          })
          activity?.components
          ?.filter(({ type }) => type === 'video')
          ?.forEach(({ contents: id }) => {
            loadVideo(id)
          })
        activity?.beta
          ?.filter(({ type }) => type === 'img')
          ?.forEach(({ contents: id }) => {
            loadImage(id)
          })
    
        activity?.beta
          ?.filter(({ type }) => type === 'video')
          ?.forEach(({ contents: id }) => {
            loadVideo(id)
          })
        activity?.alpha
          ?.filter(({ type }) => type === 'img')
          ?.forEach(({ contents: id }) => {
            loadImage(id)
          })
          activity?.alpha
          ?.filter(({ type }) => type === 'video')
          ?.forEach(({ contents: id }) => {
            loadVideo(id)
          })
        activity?.delta
          ?.filter(({ type }) => type === 'img')
          ?.forEach(({ contents: id }) => {
            loadImage(id)
          })
          activity?.delta
          ?.filter(({ type }) => type === 'video')
          ?.forEach(({ contents: id }) => {
            loadVideo(id)
          })
          activity?.gamma
          ?.filter(({ type }) => type === 'img')
          ?.forEach(({ contents: id }) => {
            loadImage(id)
          })
          activity?.gamma
          ?.filter(({ type }) => type === 'video')
          ?.forEach(({ contents: id }) => {
            loadVideo(id)
          })
      }, [activity])
    
    
    return <> 
    { <div className={`card flow ${styles.activity}`}>
            <div className={styles['lesson-info']}>
                {  activity.type==='essential' &&
                    <> 
                        {activity.components &&  <h2 className={styles['lesson-title']}>{activity.title}</h2>  }
                        { activity.components && activity.components.length > 0 && activity.components.map(component => <Component component={component}/>)}
                    </>
                }
                {  
                    user.yAxis <= 0 && activity.gamma && activity.gamma.length > 0 && 
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.gamma.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
                {  
                    user.yAxis > 0 && activity.alpha && activity.alpha.length > 0 &&
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.alpha.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
                {  
                    user.xAxis > 0 && activity.beta && activity.beta.length > 0 &&
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.beta.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
                {  
                    user.xAxis <= 0 && activity.delta && activity.delta.length > 0 &&
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.delta.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
			</div>
        </div>   
    }
    </>
}

export default Activity